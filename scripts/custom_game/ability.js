function ShowTooltip() {
	$.Msg("Hi")
	$.DispatchEvent("DOTAShowAbilityTooltip", $.GetContextPanel(), $.GetContextPanel().GetAttributeString("abilityname", ""));
}

function HideTooltip() {
	$.DispatchEvent("DOTAHideAbilityTooltip");
}