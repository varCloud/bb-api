export class UserMapper {
  static toDto(entity: any) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}
