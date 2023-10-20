import moment from "jalali-moment";
import { ToValue, ToObject, FaObjToEnDateTime, EnToFaObjDate } from "src/core/_helpers";

const date = moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss");
const dateObj = EnToFaObjDate(moment.from());

const transactionTypes = [
    { text: "بدون انتخاب", value: null },
    { text: "دریافت", value: 1 },
    { text: "پرداخت", value: 2 },
];

function getTransactionType(id) {
    if (!!id == false)
        return null;

    const tempObj = transactionTypes.filter(x => x.value == id)[0];
    return {
        TransactionTypeId: tempObj.value,
        Title: tempObj.text
    };
}

const payment = {
    Model: {
        PaymentId: "pttmp_" + Math.floor(Math.random() * 100),
        DocumentId: null,
        TransactionTypeId: null,
        RequestDtlId: null,
        PaymentDateObj: dateObj,
        PaymentDate: date,
        Price: "",
        Description: "",
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        PaymentId: dirty.PaymentId,
        DocumentId: dirty.DocumentId,
        TransactionTypeId: +dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        RequestDtlId: dirty.RequestDtlId,
        PaymentDate: dirty.PaymentDateObj ? FaObjToEnDateTime(dirty.PaymentDateObj) : dirty.PaymentDate,
        PaymentDateObj: !!dirty.PaymentDateObj == false && !!dirty.PaymentDate ? EnToFaObjDate(dirty.PaymentDate) : dirty.PaymentDateObj,
        Price: +dirty.Price,
        Description: dirty.Description,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanApi: (dirty) => ({
        PaymentId: typeof !!dirty.PaymentId == "number"? +dirty.PaymentId: null,
        DocumentId: dirty.CashDocumentId,
        TransactionTypeId: +dirty.TransactionTypeId,
        RequestDtlId: dirty.RequestDtlId,
        PaymentDate: dirty.PaymentDateObj ? FaObjToEnDateTime(dirty.PaymentDateObj) : dirty.PaymentDate,
        Price: +dirty.Price,
        Description: dirty.Description,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.PaymentId,
        Type: "payment",
        DisplayType: t("CashDocument.Money"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: dirty.Description
    }),
};

const debt = {
    Model: {
        DebtId: "pttmp_" + Math.floor(Math.random() * 100),
        DocumentId: null,
        TransactionTypeId: null,
        RequestDtlId: null,
        DebtDateObj: dateObj,
        DebtDate: date,
        Price: "",
        Description: "",
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        DebtId: dirty.DebtId,
        DocumentId: dirty.DocumentId,
        TransactionTypeId: +dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        RequestDtlId: dirty.RequestDtlId,
        DebtDate: dirty.DebtDateObj ? FaObjToEnDateTime(dirty.DebtDateObj) : dirty.DebtDate,
        DebtDateObj: !!dirty.DebtDateObj == false && !!dirty.DebtDate ? EnToFaObjDate(dirty.DebtDate) : dirty.DebtDateObj,
        Price: +dirty.Price,
        Description: dirty.Description,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanApi: (dirty) => ({
        DebtId: typeof !!dirty.DebtId == "number"? +dirty.DebtId: null,
        DocumentId: dirty.CashDocumentId,
        TransactionTypeId: +dirty.TransactionTypeId,
        RequestDtlId: dirty.RequestDtlId,
        DebtDate: dirty.DebtDateObj ? FaObjToEnDateTime(dirty.DebtDateObj) : dirty.DebtDate,
        Price: +dirty.Price,
        Description: dirty.Description,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.DebtId,
        Type: "debt",
        DisplayType: t("CashDocument.Debt"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: dirty.Description
    }),
};

const pos = {
    Model: {
        BankTransferId: "pstmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: null,
        DocumentId: null,
        RequestDtlId: null,
        PosId: "",
        BankCardId: "",
        BankAccountId: "",
        TransactionNo: "",
        TransferDateObj: dateObj,
        TransferDate: date,
        Price: "",
        ClientBankAccount: "",
        Description: "",
        IsOpen: false,
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        BankTransferId: dirty.BankTransferId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        // DocumentId: dirty.DocumentId,
        RequestDtlId: dirty.RequestDtlId,
        PosId: ToValue(dirty, "PosId"),
        Pos: ToObject(dirty, "PosId", "Pos"),
        BankAccountId: ToValue(dirty, "BankAccountId"),
        BankAccount: ToObject(dirty, "BankAccountId", "BankAccount"),
        TransactionNo: dirty.TransactionNo,
        TransferDate: FaObjToEnDateTime(dirty.TransferDateObj),
        TransferDateObj: dirty.TransferDateObj,
        Price: +dirty.Price,
        ClientBankAccount: dirty.ClientBankAccount,
        Description: dirty.Description,
        IsOpen: dirty.IsOpen,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.BankTransferId,
        Type: "pos",
        DisplayType: t("CashDocument.Pos"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: !!ToObject(dirty, "PosId", "Pos") ? ToObject(dirty, "PosId", "Pos").SerialNo : null,
    }),
};

const carToCard = {
    Model: {
        BankTransferId: "cdtmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: null,
        DocumentId: null,
        RequestDtlId: null,
        BankCardId: "",
        BankAccountId: "",
        TransactionNo: "",
        TransferDateObj: dateObj,
        TransferDate: date,
        Price: "",
        ClientBankAccount: "",
        Description: "",
        IsOpen: false,
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        BankTransferId: dirty.BankTransferId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        DocumentId: dirty.DocumentId,
        RequestDtlId: dirty.RequestDtlId,
        BankCardId: ToValue(dirty, "BankCardId"),
        BankCard: ToObject(dirty, "BankCardId", "BankCard"),
        BankAccountId: ToValue(dirty, "BankAccountId"),
        BankAccount: ToObject(dirty, "BankAccountId", "BankAccount"),
        TransactionNo: dirty.TransactionNo,
        TransferDate: FaObjToEnDateTime(dirty.TransferDateObj),
        TransferDateObj: dirty.TransferDateObj,
        Price: +dirty.Price,
        ClientBankAccount: dirty.ClientBankAccount,
        Description: dirty.Description,
        IsOpen: dirty.IsOpen,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.BankTransferId,
        Type: "pos",
        DisplayType: t("CashDocument.Pos"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: !!ToObject(dirty, "BankCardId", "BankCard") ? ToObject(dirty, "BankCardId", "BankCard").CardNumber : null,
    }),
};

const coupon = {
    Model: {
        CouponTransactionId: "cntmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: null,
        DocumentId: null,
        RequestDtlId: null,
        CouponId: "",
        TransactionNo: "",
        TransactionDateObj: dateObj,
        TransactionDate: date,
        Price: "",
        Description: "",
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        CouponTransactionId: dirty.CouponTransactionId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        // DocumentId: dirty.DocumentId,
        RequestDtlId: dirty.RequestDtlId,
        CouponId: ToValue(dirty, "CouponId"),
        Coupon: ToObject(dirty, "CouponId", "Coupon"),
        TransactionNo: dirty.TransactionNo,
        TransactionDate: FaObjToEnDateTime(dirty.TransactionDateObj),
        TransactionDateObj: dirty.TransactionDateObj,
        Price: +dirty.Price,
        Description: dirty.Description,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.CouponTransactionId,
        Type: "coupon",
        DisplayType: t("CashDocument.Coupon"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: !!ToObject(dirty, "CouponId", "Coupon") ? ToObject(dirty, "CouponId", "Coupon").CouponNumber : null,
    }),
};

const credit = {
    Model: {
        CreditId: "cttmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: 1,
        Title: "",
        Price: "",
        Description: "",
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        CreditId: dirty.CreditId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        Title: dirty.Title,
        Price: dirty.TransactionTypeId == 1 ? +dirty.Price : -1 * +dirty.Price,
        Description: dirty.Description,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.CreditId,
        Type: "credit",
        DisplayType: t("CashDocument.Credit"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.TransactionTypeId == 1 ? +dirty.Price : -1 * +dirty.Price,
        Code: dirty.Title
    }),
};

const wallet = {
    Model: {
        WalletId: "wltmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: 1,
        Title: "",
        Price: "",
        Description: "",
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        WalletId: dirty.WalletId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        Title: dirty.Title,
        Price: dirty.TransactionTypeId == 1 ? +dirty.Price : -1 * +dirty.Price,
        Description: dirty.Description,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.WalletId,
        Type: "wallet",
        DisplayType: t("CashDocument.Wallet"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.TransactionTypeId == 1 ? +dirty.Price : -1 * +dirty.Price,
        Code: dirty.Title
    }),
};

const betweenBanks = {
    Model: {
        BankTransferId: "bktmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: null,
        DocumentId: null,
        RequestDtlId: null,
        BankAccountId: "",
        BankId: "",
        TransactionNo: "",
        TransferDateObj: dateObj,
        TransferDate: date,
        Price: "",
        ClientBankAccount: "",
        Description: "",
        IsOpen: false,
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        BankTransferId: dirty.BankTransferId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        // DocumentId: dirty.DocumentId,
        RequestDtlId: dirty.RequestDtlId,
        BankAccountId: ToValue(dirty, "BankAccountId"),
        BankAccount: ToObject(dirty, "BankAccountId", "BankAccount"),
        BankId: ToValue(dirty, "BankId"),
        Bank: ToObject(dirty, "BankId", "Bank"),
        TransactionNo: dirty.TransactionNo,
        TransferDate: FaObjToEnDateTime(dirty.TransferDateObj),
        TransferDateObj: dirty.TransferDateObj,
        Price: +dirty.Price,
        Description: dirty.Description,
        IsOpen: dirty.IsOpen,
        IsDeleted: dirty.IsDeleted,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.BankTransferId,
        Type: "betweenBanks",
        DisplayType: t("CashDocument.BetweenBanks"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: !!ToObject(dirty, "BankId", "Bank") ? ToObject(dirty, "BankId", "Bank").TitleFa : null,
    }),
};

const cheque = {
    Model: {
        ChequeId: "cetmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: null,
        DocumentId: null,
        BankId: "",
        BankAccountId: "",
        ChequePaperId: "",
        RequestDtlId: null,
        ChequeDateObj: dateObj,
        ChequeDate: date,
        Price: "",
        ChequeNumber: "",
        BranchName: "",
        AccountNumber: "",
        CityName: "",
        Description: "",
        ChequePayable: "",
        IsPromissory: false,
        IsToDay: false,
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        ChequeId: dirty.ChequeId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        // DocumentId: dirty.DocumentId,
        RequestDtlId: dirty.RequestDtlId,
        BankId: ToValue(dirty, "BankId"),
        Bank: ToObject(dirty, "BankId", "Bank"),
        BankAccountId: ToValue(dirty, "BankAccountId"),
        BankAccount: ToObject(dirty, "BankAccountId", "BankAccount"),
        ChequePaperId: ToValue(dirty, "ChequePaperId"),
        ChequePaper: ToObject(dirty, "ChequePaperId", "ChequePaper"),
        ChequeDate: FaObjToEnDateTime(dirty.ChequeDateObj),
        ChequeDateObj: dirty.ChequeDateObj,
        Price: +dirty.Price,
        ChequeNumber: dirty.ChequeNumber,
        AccountNumber: dirty.AccountNumber,
        BranchName: dirty.BranchName,
        CityName: dirty.CityName,
        Description: dirty.Description,
        ChequePayable: dirty.ChequePayable,
        IsPromissory: dirty.IsPromissory,
        IsToDay: dirty.IsToDay,
        IsDeleted: false,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.ChequeId,
        Type: "cheque",
        DisplayType: t("CashDocument.Cheque"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: dirty.ChequeNumber,
    }),
};

const promissoryNote = {
    Model: {
        PromissoryNoteId: "petmp_" + Math.floor(Math.random() * 100),
        TransactionTypeId: null,
        DocumentId: null,
        RequestDtlId: null,
        PromissoryDateObj: dateObj,
        PromissoryDate: date,
        PromissoryNumber: "",
        Price: "",
        MaxPrice: "",
        Description: "",
        IsDeleted: false,
    },
    Clean: (dirty) => ({
        PromissoryNoteId: dirty.PromissoryNoteId,
        TransactionTypeId: dirty.TransactionTypeId,
        CashTransactionType: getTransactionType(dirty.TransactionTypeId),
        // DocumentId: dirty.DocumentId,
        RequestDtlId: dirty.RequestDtlId,
        PromissoryDate: FaObjToEnDateTime(dirty.PromissoryDateObj),
        PromissoryDateObj: dirty.PromissoryDateObj,
        PromissoryNumber: dirty.PromissoryNumber,
        Price: +dirty.Price,
        MaxPrice: !!dirty.MaxPrice ? dirty.MaxPrice : null,
        Description: dirty.Description,
        IsDeleted: false,
    }),
    CleanTran: (dirty, t) => ({
        TranId: dirty.PromissoryNoteId,
        Type: "promissoryNote",
        DisplayType: t("CashDocument.PromissoryNote"),
        TransactionTypeId: dirty.TransactionTypeId,
        Price: dirty.Price,
        Code: dirty.PromissoryNumber,
    }),
};

const cash = {
    Model: {
        CashDocumentId: null,
        DocumentNo: "",
        TransactionTypeId: 1,
        DocumentDateObj: dateObj,
        DocumentDate: date,
        PersonId: "",
        Person: null,
        CashId: 1,
        Description: "",
        ContractNumber: "",
        Added: 0,
        Deficit: 0,
        Transactions: [],
        Payments: [],
        Debts: [],
        BankTransfers: [],
        Cheques: [],
        CouponTransactions: [],
        Credits: [],
        PromissoryNotes: [],
        Wallets: [],
    },
    Clean: (dirty, trans) => {
        const reciept = (!!dirty.Transactions.filter(x => x.TransactionTypeId == 1).length ?
            dirty.Transactions.filter(x => x.TransactionTypeId == 1).map(x => x.Price).reduce((a, b) => a + b) : 0) + dirty.Added;
        const payment = (!!dirty.Transactions.filter(x => x.TransactionTypeId == 2).length ?
            dirty.Transactions.filter(x => x.TransactionTypeId == 2).map(x => x.Price).reduce((a, b) => a + b) : 0) + dirty.Deficit;

        return {
            CashDocumentId: dirty.CashDocumentId,
            DocumentNo: dirty.DocumentNo,
            TransactionTypeId: reciept >= payment ? 1 : 2,
            DocumentDate: FaObjToEnDateTime(dirty.DocumentDateObj),
            PersonId: ToValue(dirty, "PersonId"),
            CashId: +dirty.CashId,
            Description: dirty.Description,
            ContractNumber: dirty.ContractNumber,
            Added: +dirty.Added,
            Deficit: +dirty.Deficit,
            Payments: trans.Payments.map(x => (PaymentTools.CleanApi({...x, CashDocumentId: dirty.CashDocumentId}))),
            Debts: trans.Debts.map(x => (DebtTools.CleanApi({...x, CashDocumentId: dirty.CashDocumentId}))),
            BankTransfers: trans.BankTransfers.map(x => ({ ...x, BankTransferId: null })),
            Cheques: trans.Cheques.map(x => ({ ...x, ChequeId: null })),
            CouponTransactions: trans.CouponTransactions.map(x => ({ ...x, CouponTransactionId: null })),
            PromissoryNotes: trans.PromissoryNotes.map(x => ({ ...x, PromissoryNoteId: null })),
            Credits: trans.Credits.length ? trans.Credits.map(x => { x.PersonId = ToValue(dirty, "PersonId"); return x }) : [],
            Wallets: trans.Wallets.length ? trans.Wallets.map(x => { x.PersonId = ToValue(dirty, "PersonId"); return x }) : [],
        }
    }
};

export const CashTools = { ...cash }
export const PaymentTools = { ...payment };
export const DebtTools = { ...debt };
export const PosTools = { ...pos };
export const CardToCardTools = { ...carToCard };
export const CouponTools = { ...coupon };
export const CreditTools = { ...credit };
export const WalletTools = { ...wallet };
export const BetweenBanksTools = { ...betweenBanks };
export const ChequeTools = { ...cheque };
export const PromissoryNoteTools = { ...promissoryNote };