export default interface RepositoryInterface<T, R, S> {
  create(props: R): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  update(id: string, props: S): Promise<void>;
  delete(id: string): Promise<void>;
}
