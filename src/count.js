import * as database from './datbase'

export default function printInventory(items) {
    items = countItemsSubtotal(items);

    items = markPromotionItem(items);

    items = countSavedMoney(items);

    const total = getTotal(items);
    const saved = getSaved(items);

    return {total, saved, items}
};

const markPromotionItem = (items) => {
    const promotions = database.loadPromotions()
    const promotionBarcodes = promotions[0].barcodes
    return items.map(item => {
        let isPromotion = 0;
        if (promotionBarcodes.includes(item.barcode)) {
            isPromotion = 1;
        }

        return Object.assign({}, item, {isPromotion});
    })
}

const countItemsSubtotal = (items) => {
    return items.map(item => Object.assign({}, item, {subtotal: item.price * item.count}));
}

const countSavedMoney = (items) => {
    return items.map(item => {
        const {price, isPromotion} = item;
        let count = 0;
        if (isPromotion === 1) {
            count = Math.floor(item.count / 3);
        }

        return Object.assign({}, item, {saved: price * count});
    })
}

const getTotal = (items) => {
    return items.reduce((p, n) => p + n.subtotal, 0);
}

const getSaved = (items) => {
    return items.reduce((p, n) => p + n.saved, 0);
}
