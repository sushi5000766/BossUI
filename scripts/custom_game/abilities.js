"use strict";

function PanelFromReferenceNumber(num) {
	var children = $.GetContextPanel().Children();
	for (var i in children) {
		if (children[i].GetAttributeInt("reference_number", -1) === parseInt(num)) {
			return children[i];
		}
	}
}

function AddBossAbility(ev) {
	var p = $.CreatePanel("Panel", $.GetContextPanel(), "ability-" + ev.reference_number);
	p.BLoadLayout("file://{resources}/layout/custom_game/ability.xml", false, false);
	p.SetAttributeInt("reference_number", parseInt(ev.reference_number));
	p.SetAttributeString("abilityname", ev.ability_name);
	p.FindChildrenWithClassTraverse("ability-image")[0].abilityname = ev.ability_name;
}

function RemoveBossAbility(ev) {
	var panel = PanelFromReferenceNumber(ev.reference_number);
	if (panel) {
		panel.DeleteAsync(0);
	}
}

// Time is in MILLISECONDS!!
function StartAbilityTimer(ev) {
	var p = PanelFromReferenceNumber(ev.reference_number);
	p.SetAttributeInt("timer", parseFloat(ev.duration) * 1000 + 100);
	p.SetHasClass("active", true)
	AbilityTimerCountdown(p)
}

function AbilityTimerCountdown(panel) {
	var time_left = panel.GetAttributeInt("timer", 0);
	if (time_left > 0) {
		time_left = time_left - 100
		panel.SetAttributeInt("timer", time_left);
		var txt;
		if (time_left / 1000 % 1 === 0) {
			txt = (time_left / 1000).toString().concat(".0")
		} else {
			txt = time_left / 1000
		}
		panel.FindChildrenWithClassTraverse("ability-timer-text")[0].text = txt;
		$.Schedule(0.1, function() {
			AbilityTimerCountdown(panel);
		})
	} else {
		panel.SetAttributeInt("timer", 0);
		panel.SetHasClass("active", false);
	}
}

function CancelAbilityTimer(ev) {
	var p = PanelFromReferenceNumber(ev.reference_number);
	if (p) {
		p.SetAttributeInt("timer", 0)
	}
}

(function() {
	GameEvents.Subscribe("add_boss_ability", AddBossAbility)
	GameEvents.Subscribe("remove_boss_ability", RemoveBossAbility)
	GameEvents.Subscribe("start_ability_timer", StartAbilityTimer)
	GameEvents.Subscribe("cancel_ability_timer", CancelAbilityTimer)
})()
/*
RemoveBossAbility({
	reference_number: "1",
})
AddBossAbility({
	reference_number: "1",
	ability_name: "abaddon_aphotic_shield"
})
StartAbilityTimer({
	reference_number: "1",
	duration: "5",
}) 
$.Schedule(2, function() {
	CancelAbilityTimer({
		reference_number: "1"
	})
})
*/