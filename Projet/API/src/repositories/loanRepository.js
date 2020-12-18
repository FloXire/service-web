const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkLoan = function(loan) {
    if (!loan.bookId) {
        throw new ValidationError('The loan must be associated to a book.');
    }
    if (!loan.userId) {
        throw new ValidationError('The loan must contain the ID of the user that borrows the book.');
    }
    if (!loan.copyId) {
        throw new ValidationError('The loan must be associated to a specific copy.');
    }
}

class LoanRepository {
    constructor(db, copyRepository) {
        this.db = db;
        this.copyRepository = copyRepository;
    }

    getAll() {
        return this.db.getData("/loans");
    }

    get(id) {
        const loans = this.getAll();
        return _.find(loans, { "id": id });
    }

    getByUser(userId) {
        const users = this.db.getData("/users");

        if (_.find(users, { "id": userId }) == null) {
            throw new ValidationError("The user doesn't exist.");
        }

        const loans = this.getAll();
        return _.filter(loans, { "userId": userId });
    }

    add(loan) {
        checkLoan(loan);

        const books = this.db.getData("/books");
        const book = _.find(books, { "id": loan.bookId });

        // vérif que le book existe
        if (book == null) {
            throw new ValidationError("The book associated to the loan doesn't exist.");
        }
        // vérif que la copyId existe
        else if (!_.some(book.copies, { "id": loan.copyId })) {
            throw new ValidationError("The copy doesn't exist.");
        }

        const users = this.db.getData("/users");
        // vérif que l'user existe
        if (!_.some(users, { "id": loan.userId })) {
            throw new ValidationError("The user associated to the loan doesn't exist.");
        }

        const loans = this.getAll();
        // vérif que la copie n'a pas déjà été empruntée
        if (_.some(loans, { "copyId": loan.copyId })) {
            throw new ValidationError("The copy has already been borrowed.");
        }

        loan.id = uuid();
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();

        loan.loanDate = yyyy + '/' + mm + '/' + dd;

        this.db.push("/loans[]", loan);

        return loan;
    }

    getAvailableCopies(bookId) {
        const copies = this.copyRepository.getAll(bookId);
        let loans = this.getAll();
        loans = _.filter(loans, { "bookId": bookId });

        return _.filter(copies, ({ id }) => !(_.some(loans, { "copyId": id })));
    }

    delete(id) {
        const loans = this.getAll();
        const index = _.findIndex(loans, { "id": id });
        if (index !== -1) {
            const path = '/loans[' + index + ']';
            this.db.delete(path);
        }
    }
}

module.exports = LoanRepository;
