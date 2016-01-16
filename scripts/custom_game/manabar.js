"use strict";

var fill = $.GetContextPanel().FindChildrenWithClassTraverse("manabar-fill")[0];
var label = $.GetContextPanel().FindChildrenWithClassTraverse("manabar-text")[0];
var unit;

function OnEntitySpawned(ev) {
	$.Msg(ev)
	$.Msg(Entities.GetUnitName(parseInt(ev.entindex)).substring(0,9))
	if (Entities.GetUnitName(parseInt(ev.entindex)).substring(0,9) === "npc_boss_") {
		SetManaBarOwner({entindex: ev.entindex});
	}
}

function UpdateMana() {
	if (unit && Entities.IsAlive(unit)) {
		var max = Entities.GetMaxMana(unit);
		var current = Entities.GetMana(unit);
		label.text = current + " / " + max;
		fill.style.width = (current / max * 100).toString() + "%;";
	} else {
		label.text = "";
		fill.style.width = "0%;";
	}
	$.Schedule(0.03, UpdateMana);
}

function HideManaBar(ev) {
	$.GetContextPanel().SetHasClass("hide", true);
}

function SetManaBarOwner(ev) {
	$.GetContextPanel().SetHasClass("hide", false);
	unit = parseInt(ev.entindex);
}

(function() {
	GameEvents.Subscribe("npc_spawned", OnEntitySpawned)
	GameEvents.Subscribe("set_mana_bar_owner", SetManaBarOwner)
	GameEvents.Subscribe("hide_mana_bar", HideManaBar)
	UpdateMana();
})();