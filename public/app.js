const scenarios = {
  accept: {
    action: "accept_offer",
    amount: "3.00 USD",
    decision: "allowed",
    reason_codes: ["within_budget", "authority_scope_match"],
    next_step: "send acceptance with A2A extension-scoped mandate metadata",
  },
  overBudget: {
    action: "make_offer",
    amount: "7.00 USD",
    decision: "denied",
    reason_codes: ["hard_constraint_violation", "price_above_budget"],
    next_step: "do not send offer",
  },
  disclosure: {
    action: "disclose_reservation_price",
    decision: "denied",
    reason_codes: ["protected_information", "disclosure_policy_violation"],
    next_step: "summarize non-private terms only",
  },
  checkout: {
    action: "ucp_checkout_ready",
    amount: "3.00 USD",
    decision: "requires_escalation",
    reason_codes: ["payment_boundary", "human_confirmation_required"],
    next_step: "pause and request confirmation through trusted UI",
  },
};

const select = document.querySelector("#scenario-select");
const output = document.querySelector("#decision-output");
const button = document.querySelector("#evaluate-button");

function renderDecision() {
  const value = select.value;
  const result = scenarios[value] || scenarios.accept;
  output.textContent = JSON.stringify(result, null, 2);
}

button.addEventListener("click", renderDecision);
select.addEventListener("change", renderDecision);
renderDecision();
