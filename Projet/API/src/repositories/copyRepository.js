const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkCopy = function(copy) {
    if (!copy.submissionDate) {
        throw new ValidationError('The book must have a submissionDate.');
    }
}

class CopyRepository {
    constructor(db, bookRepository) {
        this.db = db;
        this.bookRepository = bookRepository;
    }

    getAll(bookId) {
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists');
        }

        return this.db.getData(bookPath + '/copies');
    }

    get(bookId, id) {
        const copies = this.getAll(bookId);
        return _.find(copies, { id });
    }

    add(bookId, copy) {
        checkCopy(copy);
        copy.id = uuid();

        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists');
        }

        this.db.push(bookPath + '/copies[]', copy)

        return copy
    }

    update(bookId, id, copy) {
        if (copy.id !== id) {
            throw new ValidationError('You cannot change the identifier.');
        }

        checkCopy(copy)

        const copyPath = this.getIdPath(bookId, id);
        if (copyPath == null) {
            throw new ValidationError('This copy does not exists');
        }

        this.db.push(copyPath, copy);

        return copy;
    }

    delete(bookId, id) {
        const copyPath = this.getIdPath(bookId, id)

        if (copyPath != null) {
            this.db.delete(copyPath);
        }
    }

    getIdPath(bookId, id) {
        const copies = this.getAll(bookId);
        const index = _.findIndex(copies, { id });
        if (index == -1) {
            return null;
        }

        const bookPath = this.bookRepository.getIdPath(bookId);
        return bookPath + '/copies[' + index + ']';
    }
}

module.exports = CopyRepository;