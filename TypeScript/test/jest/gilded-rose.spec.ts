import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("The Quality of Conjured item  never negative", () => {
    const gildedRose = new GildedRose([new Item("Conjured", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Aged Brie actually increases in Quality the older it gets", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  it("The Quality of Aged Brie is never more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 8),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(8);
  });

  it("The Quality of Backstage passes increased by one when sellIn is more than 10 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 25, 23),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(24);
  });

  it("The Quality of Backstage passes increased by 2 when sellIn is more than 5 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 23),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(25);
  });

  it("The Quality of Backstage passes increased by 3 when sellIn is less than 5 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 23),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(26);
  });

  it("Conjured items degrade in Quality twice as fast as normal items", () => {
    const gildedRose = new GildedRose([new Item("Conjured", 5, 24)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });
});
