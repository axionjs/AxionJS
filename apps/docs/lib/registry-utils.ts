import { RegistryFile, RegistryItem, RegistryNode } from "@/types/registry";

/**
 * Converts a flat registry files array into a hierarchical file tree structure
 */
export function generateRegistryTree(
  registryData: RegistryItem
): RegistryNode[] {
  const tree: RegistryNode[] = [];

  // Sort files alphabetically for consistent tree generation
  const sortedFiles = [...registryData.files].sort((a, b) =>
    a.path.localeCompare(b.path)
  );

  for (const file of sortedFiles) {
    const pathParts = file.path.split("/").filter(Boolean);
    let currentLevel = tree;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const isLast = i === pathParts.length - 1;
      const path = "/" + pathParts.slice(0, i + 1).join("/");

      let node = currentLevel.find((n) => n.name === part);

      if (!node) {
        node = {
          name: part,
          path,
          type: isLast ? "file" : "directory",
          ...(isLast ? { content: file.content } : { children: [] }),
        };
        currentLevel.push(node);
      }

      if (!isLast) {
        node.children = node.children || [];
        currentLevel = node.children;
      }
    }
  }

  return tree;
}

/**
 * Finds the first file in a node tree
 */
export function findFirstFile(nodes: RegistryNode[]): RegistryNode | null {
  for (const node of nodes) {
    if (node.type === "file") {
      return node;
    }
    if (node.children) {
      const foundFile = findFirstFile(node.children);
      if (foundFile) {
        return foundFile;
      }
    }
  }
  return null;
}

/**
 * Finds a file in the tree by its path
 */
export function findFileByPath(
  nodes: RegistryNode[],
  path: string
): RegistryNode | null {
  for (const node of nodes) {
    if (node.path === path) {
      return node;
    }
    if (node.children) {
      const found = findFileByPath(node.children, path);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
