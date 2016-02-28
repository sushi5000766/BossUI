"use strict"

var displayedHeroIndex = 0
var picked = false

function setDisplayedHero(hero) {
	$("#name").text = $.Localize(heroes[hero].heroname)
	$("#portrait").SetImage(heroes[hero].portrait)
	$("#health-label").text = heroes[hero].health
	$("#mana-label").text = heroes[hero].mana
	$("#damage-label").text = heroes[hero].damage 
	$("#movespeed-label").text = heroes[hero].movespeed
	$("#role-value").text = $.Localize(heroes[hero].role)
	$("#magic-damage-value").text = $.Localize(heroes[hero].magicDamage)
	$("#physical-damage-value").text = $.Localize(heroes[hero].physicalDamage)
	$("#strong-vs-value").text = $.Localize(heroes[hero].strongVs)
	$("#weak-vs-value").text = $.Localize(heroes[hero].weakVs)

	var showcase = $.GetContextPanel().FindChildrenWithClassTraverse("abilities-showcase")[0]
	showcase.RemoveAndDeleteChildren()
	heroes[hero].abilities.forEach(function(ability, index) {
		var p = $.CreatePanel("Panel", showcase, "ability-" + index)
		p.SetAttributeInt("index", index)
		p.BLoadLayout("file://{resources}/layout/custom_game/pick_screen_ability.xml", false, false);
		p.SetAttributeString("abilityname", ability)
		p.FindChildrenWithClassTraverse("ability-image")[0].abilityname = ability
	})
	var count = heroes[hero].abilities.length
	showcase.SetHasClass("ability-layout-3-col", count <= 6)
	showcase.SetHasClass("ability-layout-4-col", count > 6)
}

function nextHero() {
	if (displayedHeroIndex === heroes.length - 1) {
		displayedHeroIndex = 0
	} else {
		displayedHeroIndex++
	}
	setDisplayedHero(displayedHeroIndex)
}

function prevHero() {
	if (displayedHeroIndex === 0) {
		displayedHeroIndex = heroes.length - 1
	} else {
		displayedHeroIndex--
	}
	setDisplayedHero(displayedHeroIndex)
}

function pickHero() {
	if (!picked) {
		GameEvents.SendCustomGameEventToServer("hero_picked", {heroname: heroes[displayedHeroIndex].heroname})
		picked = true
		Game.EmitSound("HeroPicker.Selected")
	}
}


var heroes = [
	{
		heroname: "Fire Mage",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait fire mage.png",
		health: "3000",
		mana: "200",
		damage: "25",
		movespeed: "280",
		role: "Offensive Mage",
		magicDamage: "Very High",
		physicalDamage: "None",
		strongVs: "Water / Ice",
		weakVs: "Fire / Lightning",
		abilities: [
			"keeper_of_the_light_illuminate",
			"keeper_of_the_light_illuminate",
			"keeper_of_the_light_illuminate",
			"keeper_of_the_light_illuminate",
			"keeper_of_the_light_illuminate",
			"keeper_of_the_light_illuminate",
			"keeper_of_the_light_illuminate",
			"keeper_of_the_light_illuminate",
		]
	},
	{
		heroname: "Kanye West",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait warlock.png",
		health: "420",
		mana: "69",
		damage: "25000",
		movespeed: "40",
		role: "Rapper",
		magicDamage: "Very High",
		physicalDamage: "None",
		strongVs: "Water / Ice",
		weakVs: "Fire / Lightning",
		abilities: [],
	},
]