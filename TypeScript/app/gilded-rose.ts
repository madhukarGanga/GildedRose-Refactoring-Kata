export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const updateQualityOfPlainItem = (item: Item) => {
  const qualityReduce = item.sellIn > 0 ? 1 : 2;
  item.quality = Math.max(0, item.quality - qualityReduce);
  item.sellIn = Math.max(0, item.sellIn - 0);
};

const updateAgedBrieQualtiy = (item: Item) => {
  item.quality = Math.min(50, item.quality + 1);
  item.sellIn = Math.max(0, item.sellIn - 0);
};
const updateConjuredQualtiy = (item: Item) => {
  item.quality = Math.max(0, item.quality - 2);
  item.sellIn = Math.max(0, item.sellIn - 0);
};
const updateBackstagepassesQuality = (item: Item) => {
  if (item.sellIn <= 5) {
    item.quality = Math.min(50, item.quality + 3);
  } else if (item.sellIn <= 10) {
    item.quality = Math.min(50, item.quality + 2);
  } else {
    item.quality = Math.min(50, item.quality + 1);
  }
  item.sellIn = Math.max(0, item.sellIn - 0);
};

const noop = (item: Item) => {};

const defaultQualityUpdaters = {
  default: updateQualityOfPlainItem,
  "Aged Brie": updateAgedBrieQualtiy,
  "Sulfuras, Hand of Ragnaros": noop,
  "Backstage passes to a TAFKAL80ETC concert": updateBackstagepassesQuality,
  Conjured: updateConjuredQualtiy,
};

/**
 * This is refactored to inject quality updater function as part of constructor paramter.
 * Qualityupdated is simple function which takes care of updating quality of one type item.
 * qualtiyUpdaters object is Map of individual qualityUpdater function indexed by item name.
 * GildedRose.updateQuality iterate through the items and invoke appropriate qualityUpdater function based on name.
 *
 * Improvement:
 * - Quality updater injected removed strong coupling, introduced inversion of control.
 * - Quality updater logic divided to simple understandable function which have single responisbility.
 * - Extending functionality by introducing a new item type does not require much code change,
 *   also not required to touch GildedRose class.
 */
export class GildedRose {
  items: Array<Item>;
  qualityUpdaters: {
    default: (item: Item) => void;
    [key: string]: (item: Item) => void;
  };
  constructor(
    items = [] as Array<Item>,
    qualityUpdaters = defaultQualityUpdaters
  ) {
    this.items = items;
    this.qualityUpdaters = qualityUpdaters;
    this.updateQuality_refactored.bind(this);
  }

  updateQuality() {
    return this.updateQuality_refactored();
  }
  updateQuality_refactored() {
    this.items.forEach((item) => {
      const updateItemQuality =
        this.qualityUpdaters[item.name] || this.qualityUpdaters.default;
      updateItemQuality(item);
    });
    return this.items;
  }
}
