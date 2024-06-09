import { Component } from "@angular/core";
import { RoleService } from "../role.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

interface Permission {
    id: number;
    name: string;
    parentId: number;
}

interface TreeNode {
  id: number;
  name: string;
  parentId: number | null;
  children?: TreeNode[];
  checked?: boolean;
}

@Component({
    selector: "app-create-role",
    templateUrl: "./create-role.component.html"
})
export class CreateRoleComponent {

    permissions: TreeNode[] = [];
    treeControl: NestedTreeControl<TreeNode>;
    dataSource: MatTreeNestedDataSource<TreeNode>;

    constructor(
      private readonly roleService: RoleService
    ){
      this.treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<TreeNode>();
    }

    async ngOnInit(){
      const perms = await this.roleService.getPermissions();
      this.dataSource.data = this.buildTree(perms);
      const test = this.buildTree(perms);
    }

    getSelectedPermissions(){
      console.log(this.treeControl);
    }

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    buildTree(permissions: Permission[]): TreeNode[] {
      const map = new Map<number, TreeNode>();
      const roots: TreeNode[] = [];
    
      // Initialize map
      permissions.forEach(permission => {
        map.set(permission.id, { ...permission, children: [] });
      });
    
      // Build the tree
      permissions.forEach(permission => {
        const node = map.get(permission.id);
        if (permission.parentId !== null && permission.parentId !== 0) {
          const parent = map.get(permission.parentId);
          if (parent) {
            parent.children!.push(node!);
          }
        } else {
          roots.push(node!);
        }
      });
    
      return roots;
    }

    onCheckChange(node: TreeNode, checked: boolean) {
      this.updateChildNode(node, checked);
      this.updateParentNode(node);
    }
  
    updateChildNode(node: TreeNode, checked: boolean) {
      node.checked = checked;
      if (node.children) {
        node.children.forEach(child => this.updateChildNode(child, checked));
      }
    }
  
    updateParentNode(node: TreeNode) {
      const parentId = node.parentId;
      if (parentId !== null) {
        const parentNode = this.findParentNode(this.dataSource.data, parentId);
        if (parentNode) {
          parentNode.checked = parentNode.children!.some(child => child.checked);
          this.updateParentNode(parentNode);
        }
      }
    }
  
    findParentNode(nodes: TreeNode[], parentId: number): TreeNode | null {
      for (const node of nodes) {
        if (node.id === parentId) {
          return node;
        }
        if (node.children) {
          const found = this.findParentNode(node.children, parentId);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }
}