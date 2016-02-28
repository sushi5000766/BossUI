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
	$("#magic-damage-value").style.color = colors[heroes[hero].magicDamage]
	$("#physical-damage-value").text = $.Localize(heroes[hero].physicalDamage)
	$("#physical-damage-value").style.color = colors[heroes[hero].physicalDamage]
	$("#strong-vs-value").text = $.Localize(heroes[hero].strongVs)
	$("#strong-vs-value").style.color = colors[heroes[hero].strongVs]
	$("#weak-vs-value").text = $.Localize(heroes[hero].weakVs)
	$("#weak-vs-value").style.color = colors[heroes[hero].weakVs]

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
	if (!picked) {
		if (displayedHeroIndex === heroes.length - 1) {
			displayedHeroIndex = 0
		} else {
			displayedHeroIndex++
		}
		setDisplayedHero(displayedHeroIndex)
	}
}

function prevHero() {
	if (!picked) {
		if (displayedHeroIndex === 0) {
			displayedHeroIndex = heroes.length - 1
		} else {
			displayedHeroIndex--
		}
		setDisplayedHero(displayedHeroIndex)
	}
}

function pickHero() {
	if (!picked) {
		GameEvents.SendCustomGameEventToServer("hero_picked", {heroname: heroes[displayedHeroIndex].heroname})
		picked = true
		Game.EmitSound("HeroPicker.Selected")
		var btns = [$("#left-btn"), $("#right-btn"), $("#pick-btn")]
		btns.forEach(function(btn) {
			btn.SetHasClass("disabled", true)
		})
	}
}

var colors = {
	"None": "#ff0000",
	"Low": "#ff6600",
	"Medium": "#ffff00",
	"High": "#008900",
	"High (Bear Form)": "#008900",
	"High (Druid Form)": "#008900",
	"Very High": "#117d2d",
	"Water & Ice": "#508ffc",
	"Fire & Lightning": "#ff0000",
	"Light": "#ffff00",
	"Light & Nature": "#6ddb00",
	"Shadow": "#89009b",
}

var heroes = [
	{
		heroname: "Death Knight",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait death knight.png",
		health: "3000",
		mana: "200",
		damage: "75",
		movespeed: "280",
		role: "Offensive Melee",
		magicDamage: "High",
		physicalDamage: "High",
		strongVs: "Light & Nature",
		weakVs: "Shadow",
		abilities: [
			"dk_fury",
			"dk_reanimate",
			"dk_shadow_guard",
			"dk_shadow_step",
			"dk_siphon",
			"dk_unholy",
			"dk_defile",
		]
	},
	{
		heroname: "Druid",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait druid.png",
		health: "3000",
		mana: "200",
		damage: "25-45",
		movespeed: "280",
		role: "Offensive Hybrid",
		magicDamage: "High (Druid Form)",
		physicalDamage: "High (Bear Form)",
		strongVs: "None",
		weakVs: "None",
		abilities: [
			"dr_maul",
			"dr_rend",
			"dr_renew",
			"dr_sprint",
			"dr_starfall",
			"dr_bearform",
			"fm_mystic_veil",
			"fm_counter_spell",
		]
	},
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
		strongVs: "Water & Ice",
		weakVs: "Fire & Lightning",
		abilities: [
			"fm_enrage_spirit",
			"fm_incinerate",
			"fm_meteor",
			"fm_mystic_veil",
			"fm_phoenix_aura",
			"fm_scorch",
			"fm_counter_spell",
		]
	},
	{
		heroname: "Ice Mage",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait frost mage.png",
		health: "3000",
		mana: "200",
		damage: "25",
		movespeed: "280",
		role: "Offensive Mage",
		magicDamage: "High",
		physicalDamage: "None",
		strongVs: "Fire & Lightning",
		weakVs: "Water & Ice",
		abilities: [
			"fr_buff",
			"fr_charge",
			"fr_chill",
			"fr_field",
			"fr_insta",
			"fr_shield",
			"fm_mystic_veil",
		]
	},
	{
		heroname: "Paladin",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait paly.png",
		health: "3500",
		mana: "200",
		damage: "40",
		movespeed: "280",
		role: "Supporting Healer",
		magicDamage: "Medium",
		physicalDamage: "Low",
		strongVs: "Shadow",
		weakVs: "Light",
		abilities: [
			"pl_aura",
			"pl_blessing",
			"pl_divine_shield",
			"pl_exodus",
			"pl_heal",
			"pl_strike",
			"pl_taunt",
		]
	},
	{
		heroname: "Priest",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait priest.png",
		health: "3000",
		mana: "250",
		damage: "25",
		movespeed: "280",
		role: "Healer",
		magicDamage: "Low",
		physicalDamage: "None",
		strongVs: "Shadow",
		weakVs: "Light",
		abilities: [
			"pr_buff",
			"pr_fast_heal",
			"pr_full_heal",
			"pr_multi_heal",
			"pr_nuke",
			"fm_mystic_veil",
		]
	},
	{
		heroname: "Ranger",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait ranger.png",
		health: "2500",
		mana: "200",
		damage: "25-50",
		movespeed: "280",
		role: "Offensive Ranged",
		magicDamage: "High",
		physicalDamage: "Medium",
		strongVs: "None",
		weakVs: "None",
		abilities: [
			"ro_assassinate",
			"ro_closein",
			"ro_cripple",
			"ro_shred",
			"ro_sprint",
			"ro_unbreakable_will",
		]
	},
	{
		heroname: "Rogue",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait rogue.png",
		health: "2500",
		mana: "200",
		damage: "45",
		movespeed: "280",
		role: "Offensive Melee",
		magicDamage: "None",
		physicalDamage: "Very High",
		strongVs: "None",
		weakVs: "None",
		abilities: [
			"ro_assassinate",
			"ro_closein",
			"ro_cripple",
			"ro_shred",
			"ro_sprint",
			"ro_unbreakable_will",
		]
	},
	{
		heroname: "Warlock",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait warlock.png",
		health: "3000",
		mana: "200",
		damage: "25",
		movespeed: "280",
		role: "Offensive Mage",
		magicDamage: "Very High",
		physicalDamage: "None",
		strongVs: "Light & Nature",
		weakVs: "Shadow",
		abilities: [
			"wa_life_drain",
			"wa_malice",
			"wa_torment",
			"wa_tainted_soul",
			"wa_envelop",
			"fm_mystic_veil",
		]
	},
	{
		heroname: "Warrior",
		portrait: "file://{images}/custom_game/pick_screen/portraits/portrait warrior.png",
		health: "5000",
		mana: "200",
		damage: "30",
		movespeed: "280",
		role: "Tank",
		magicDamage: "Low",
		physicalDamage: "Medium",
		strongVs: "None",
		weakVs: "None",
		abilities: [
			"or_avatar",
			"or_charge",
			"or_shield_wall",
			"or_titan_slam",
			"or_counter_spell",
			"or_war_stomp",
		]
	},
]


setDisplayedHero(displayedHeroIndex)
