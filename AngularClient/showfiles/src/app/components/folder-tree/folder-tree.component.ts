import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import {
  CollectionViewer,
  SelectionChange,
  DataSource,
} from '@angular/cdk/collections';

import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FlatTreeControl } from '@angular/cdk/tree';
// import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.css'],
})
export class FolderTreeComponent {
  @Output() selectedFolder: EventEmitter<string>;
  homeFolder: string = '<unknown>';
  folderPaths: string[] = [];

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  constructor(
    private fileService: FilesService,
    private folderStructure: DynamicFolderStructure
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(
      this.fileService,
      this.treeControl,
      folderStructure
    );
    this.selectedFolder = new EventEmitter();
  }

  retrieveHomeFolder(): void {
    this.fileService.getHomeFolder().subscribe((root: string) => {
      this.homeFolder = root;
    });
  }

  retrieveFolderList(): void {
    this.folderStructure
      .initialData(this.homeFolder)
      .subscribe((r: DynamicFlatNode[]) => {
        this.dataSource.data = r;
      });

    // this.fileService.getFiles(this.homeFolder).subscribe((r: string[]) => {
    //   this.folderPaths = r;
    // });
  }

  logNode(node: DynamicFlatNode) {
    console.log(node.item);
    this.selectedFolder.emit(node.item);
  }
}

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({ providedIn: 'root' })
export class DynamicFolderStructure {
  dataMap = new Map<string, string[]>([]);

  rootLevelNodes: string[] = ['Fruits', 'Vegetables'];

  constructor(private fileService: FilesService) {}

  /** Initial data from database */
  initialData(homeFolder: string): Observable<DynamicFlatNode[]> {
    return this.fileService.getFolders(homeFolder).pipe(
      map((response) => {
        return response.map((name) => new DynamicFlatNode(name, 0, true));
      })
    );
  }

  // getChildren(node: string): string[] | undefined {
  //   return this.dataMap.get(node);
  // }

  isExpandable(node: string): boolean {
    return true;
    // return this.dataMap.has(node);
  }
}

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private fileService: FilesService,
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicFolderStructure
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe((change) => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach((node) => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    console.log('getChildren ' + node.item);

    node.isLoading = true;
    const index = this.data.indexOf(node);
    this.fileService.getFolders(node.item).subscribe((children: string[]) => {
      if (!children || index < 0) {
        // If no children, or cannot find the node, no op
        return;
      }

      if (expand) {
        const nodes = children.map(
          (name) =>
            new DynamicFlatNode(
              name,
              node.level + 1,
              this._database.isExpandable(name)
            )
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
  }
}
