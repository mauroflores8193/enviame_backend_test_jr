const User = require('../entities/user');

class ManageUsersUsecase {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getUsers() {
    return await this.usersRepository.getAll();
  }

  async getUser(id) {
    return await this.usersRepository.get(id);
  }

  async createUser(data) {
    const user = new User(undefined, data.name, data.email, data.password, data.is_admin);
    return await this.usersRepository.create(user);
  }

  async updateUser(id, data) {
    const user = new User(id, data.name, data.email, data.password, data.is_admin);
    await this.usersRepository.update(user);
    return user;
  }

  async deleteUser(id) {
    await this.usersRepository.delete(id);
  }

  async getBuyers() {
    return await this.usersRepository.getBuyers();
  }

  async getSellers() {
    return await this.usersRepository.getSellers();
  }

}

module.exports = ManageUsersUsecase;
