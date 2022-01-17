class BaseService {
    constructor(model) {
        this.model = model;
    }

    list(where) {
        return this.model?.find(where || {});
    }
    create(data) {
        return new this.model(data)?.save();
    }
    update(where, data) {
        return this.model?.findOneAndUpdate(where, data, { new: true });
    }
    delete(where) {
        return this.model?.findOneAndDelete(where);
    }
    findOne(where) {
        return this.model?.findOne(where);
    }

}

module.exports = BaseService;