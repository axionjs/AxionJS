export interface RegistryNode {
  name: string;
  path: string;
  type: "directory" | "file";
  children?: RegistryNode[];
  content?: string;
}

export interface RegistryFile {
  path: string;
  content: string;
  type: string;
  target?: string;
}

export interface RegistryItem {
  $schema?: string;
  name: string;
  type: string;
  author?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}
