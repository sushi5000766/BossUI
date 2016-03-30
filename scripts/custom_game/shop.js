"use strict";

function getShop() {
	return $.GetContextPanel().FindChildrenWithClassTraverse("shop")[0]
}

function toggleShop() {
	var shop = getShop()
	if (!shop.BHasClass("disabled")) {
		shop.SetHasClass("hidden", !shop.BHasClass("hidden"))
		Game.EmitSound(shop.BHasClass("hidden") ? "Shop.PanelDown" : "Shop.PanelUp")
	}
}

function enableShop() {
	getShop().SetHasClass("disabled", false)
	$("#shop-btn").SetHasClass("disabled", false)
}

function disableShop() {
	var shop = getShop()
	$("#shop-btn").SetHasClass("disabled", true)
	shop.SetHasClass("disabled", true)
	if (!shop.BHasClass("hidden")) {
		shop.SetHasClass("hidden", true)
	}
}

function bossItemPurchased(event) {
	var item = event.item
	var removed = false
	$("#boss").Children().forEach(function(panel) {
		if (panel.itemname === item && !removed) {
			panel.DeleteAsync(0)
			removed = true
		}
	})
}

function updateShop(event) {
	var inventory = event.inventory
	var itemsByCategory = {general: 0, scrolls: 0, boss: 0}
	for (var i in inventory) {
		var item = inventory[i].name
		var cost = inventory[i].cost
		var costType = inventory[i].costType
		var shopname = (i < 13 ? "general" : (i > 24) ? "boss" : "scrolls")
		itemsByCategory[shopname]++
		if ($("#item" + i)) {
			$("#item" + i).SetAttributeString("itemname", item)
		} else {
			(function(item, costType, cost) {
				var p = $.CreatePanel("Button", $("#" + shopname), "item" + i)
				var img = $.CreatePanel("DOTAItemImage", p, "itemimg" + i)
				p.SetHasClass("shop-item", true)
				p.itemname = item
				p.costType = costType
				p.cost = cost
				img.itemname = item

				var costContainer = $.CreatePanel("Panel", p, "costcontainer" + i)
				costContainer.SetHasClass("cost-display-container", true)
				var costDisplay = $.CreatePanel("Label", costContainer, "costdisplay" + i)
				costDisplay.SetHasClass("cost-display", true)
				costDisplay.SetHasClass("cost-type-" + costType, true)
				costDisplay.text = cost

				p.SetPanelEvent("onmouseover", function() {
					$.DispatchEvent('DOTAShowAbilityTooltip', p, item)
				})
				p.SetPanelEvent("onmouseout", function() {
					$.DispatchEvent('DOTAHideAbilityTooltip')
				})
				p.SetPanelEvent("oncontextmenu", function() {
					GameEvents.SendCustomGameEventToServer("purchase_item", {
						item: item,
						costType: costType,
						cost: cost,
					})
				})
			})(item, costType, cost)
		}
	}
	for (var shop in itemsByCategory) {
		for (var i = 1; i <= 12; i++) {
			$("#" + shop).SetHasClass("item-count-" + i, itemsByCategory[shop] === i)
		}
	}
}

GameEvents.Subscribe("enable_shop", enableShop)
GameEvents.Subscribe("disable_shop", disableShop)
GameEvents.Subscribe("boss_item_purchased", bossItemPurchased)
GameEvents.Subscribe("update_shop", updateShop)

enableShop()