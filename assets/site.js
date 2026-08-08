
document.body.classList.add("js-enabled");
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuButton = $(".menu-button");
const siteNav = $(".site-nav");
if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

const routeMap = {
  england: {
    ordinary: ["Report to the relevant local council","Small-scale fly-tipping should normally be reported to the council responsible for the location.","https://www.gov.uk/report-flytipping","Open official reporting service"],
    serious: ["Report serious waste crime or environmental risk","Large-scale, hazardous or organised waste crime may require the Environment Agency. Use emergency services for an immediate danger.","https://www.gov.uk/report-an-environmental-incident","Report environmental incident"],
    private: ["Report the incident and establish land responsibility","A council may investigate, but the landowner is commonly responsible for lawful clearance on private land.","https://www.gov.uk/report-flytipping","Open official guidance"],
    water: ["Report an environmental incident","Use the Environment Agency route where dumped waste is affecting water or presents a serious environmental risk.","https://www.gov.uk/report-an-environmental-incident","Report environmental incident"]
  },
  wales: {
    ordinary: ["Use the local-authority route","Fly-tipping Action Wales directs ordinary incidents to the council responsible for the location.","https://www.flytippingactionwales.org/report-fly-tipping","Find the Welsh reporting route"],
    serious: ["Report serious environmental risk to Natural Resources Wales","Use the regulator's incident route for serious, hazardous or organised dumping.","https://naturalresources.wales/about-us/contact-us/report-an-incident/?lang=en","Report an incident"],
    private: ["Report it and preserve evidence","The local authority or NRW may investigate, while clearance responsibility may remain with the landowner.","https://naturalresources.wales/guidance-and-advice/environmental-topics/waste-management/what-to-do-about-fly-tipped-waste-on-your-land/?lang=en","Read private-land guidance"],
    water: ["Report the incident to Natural Resources Wales","Use the environmental incident service where waste affects land or water or poses a serious risk.","https://naturalresources.wales/about-us/contact-us/report-an-incident/?lang=en","Report an incident"]
  },
  scotland: {
    ordinary: ["Report to the relevant local authority","Scottish Government guidance directs ordinary reports to the council responsible for the location.","https://www.gov.scot/policies/managing-waste/litter-and-flytipping/","Open Scottish guidance"],
    serious: ["Use the council route and SEPA where appropriate","Hazardous, ongoing or water-related incidents may be passed to SEPA or Police Scotland.","https://www2.sepa.org.uk/environmentalevents","Report an environmental event"],
    private: ["Report to the council and establish land responsibility","The landowner may have to arrange lawful clearance while the relevant body considers investigation.","https://www.gov.scot/policies/managing-waste/litter-and-flytipping/","Open Scottish guidance"],
    water: ["Report the environmental event to SEPA","Use SEPA's service for pollution, hazardous material or an incident affecting water.","https://www2.sepa.org.uk/environmentalevents","Report to SEPA"]
  },
  "northern-ireland": {
    ordinary: ["Report to the relevant local council","nidirect advises reporting ordinary fly-tipping to the council responsible for the location.","https://www.nidirect.gov.uk/articles/fly-tipping","Open council reporting guidance"],
    serious: ["Report serious or persistent waste crime","The Northern Ireland Environment Agency Environmental Crime Unit deals with the most serious and persistent environmental crime.","https://www.nidirect.gov.uk/articles/report-waste-crime","Report waste crime"],
    private: ["Report to the council and establish land responsibility","Use the local council route to report and establish the available investigation and clearance action.","https://www.nidirect.gov.uk/articles/fly-tipping","Open official guidance"],
    water: ["Report serious environmental or waste crime","Use the official waste-crime route where dumping affects land or water or presents a serious risk.","https://www.nidirect.gov.uk/articles/report-waste-crime","Report waste crime"]
  }
};

const routeForm = $("#route-form");
if (routeForm) {
  routeForm.addEventListener("submit", event => {
    event.preventDefault();
    const nation = $("#route-nation").value;
    const type = $("#route-type").value;
    const route = routeMap[nation]?.[type];
    if (!route) return;
    const result = $("#route-result");
    result.innerHTML = `<p class="eyebrow">Recommended official route</p><h2>${route[0]}</h2><p>${route[1]}</p>
      <div class="route-actions"><a class="button primary" href="${route[2]}">${route[3]}</a><a class="button secondary" href="escalation.html">Plan the record</a></div>
      <p class="small muted">Save the submission, acknowledgement, reference and any stated response target.</p>`;
    result.hidden = false;
    result.scrollIntoView({behavior:"smooth", block:"nearest"});
  });
}

// Enhance pre-rendered nation sections as tabs.
const tabs = $("#nation-tabs");
if (tabs) {
  const cards = $$("[data-country]");
  function showNation(slug) {
    cards.forEach(card => card.classList.toggle("is-active", card.dataset.country === slug));
    $$("button[data-slug]", tabs).forEach(button => button.setAttribute("aria-selected", String(button.dataset.slug === slug)));
  }
  tabs.addEventListener("click", event => {
    const button = event.target.closest("button[data-slug]");
    if (button) showNation(button.dataset.slug);
  });
  showNation("england");
}

// Filter pre-rendered authority cards.
const bodyList = $("#body-list");
if (bodyList) {
  const cards = $$(".body-card", bodyList);
  const search = $("#body-search");
  const nation = $("#body-nation");
  const type = $("#body-type");
  const empty = $("#body-empty");
  function filterBodies() {
    const query = search.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const match = card.dataset.search.includes(query)
        && (nation.value === "all" || card.dataset.nation === nation.value)
        && (type.value === "all" || card.dataset.role === type.value);
      card.hidden = !match;
      if (match) shown += 1;
    });
    empty.hidden = shown !== 0;
  }
  search.addEventListener("input", filterBodies);
  nation.addEventListener("change", filterBodies);
  type.addEventListener("change", filterBodies);
}

// Filter pre-rendered sources.
const sourceList = $("#source-list");
if (sourceList) {
  const cards = $$(".source-card", sourceList);
  const input = $("#source-search");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    cards.forEach(card => card.hidden = !card.dataset.search.includes(query));
  });
}

const ombudsmanLinks = {
  england:["Local Government and Social Care Ombudsman","https://www.lgo.org.uk/make-a-complaint/fact-sheets/environment-and-waste/waste-and-refuse"],
  wales:["Public Services Ombudsman for Wales","https://www.ombudsman.wales/how-to-complain/"],
  scotland:["Scottish Public Services Ombudsman","https://www.spso.org.uk/how-to-complain-about-public-service"],
  "northern-ireland":["Northern Ireland Public Services Ombudsman","https://www.nipso.org.uk/make-complaint/how-make-complaint"]
};
const escalationForm = $("#escalation-form");
if (escalationForm) {
  escalationForm.addEventListener("submit", event => {
    event.preventDefault();
    const nation = $("#esc-nation").value;
    const stage = $("#esc-stage").value;
    const ref = $("#esc-reference").value.trim().replace(/[<>]/g, "");
    let title="", steps=[], action="";
    if (stage==="not-reported") {
      title="Make the official service report first";
      steps=["Use the nation-specific reporting route.","Save the full submission and any photographs.","Record the acknowledgement, reference and published target."];
      action='<a class="button primary" href="report.html">Find reporting route</a>';
    } else if (stage==="reported") {
      title="Check the published target, then follow up";
      steps=["Confirm the report is with the correct body.","Quote the report date and reference.","State what remains unresolved and ask for a specific action date.","Do not call it overdue unless a target or promised date has passed."];
      action='<button class="button primary" type="button" data-copy-template="followup">Copy follow-up structure</button>';
    } else if (stage==="promise-missed") {
      title="Record the missed commitment and consider a formal complaint";
      steps=["Quote the exact promised action and date.","Attach a short chronology rather than resending every document.","Ask for the revised action date and reason for delay.","If the issue is service handling, use the formal complaint route."];
      action='<button class="button primary" type="button" data-copy-template="complaint">Copy complaint structure</button>';
    } else if (stage==="complaint-open") {
      title="Track the complaint separately";
      steps=["Record the complaint reference and response target.","Keep new incident updates linked but separate.","Follow up when the complaint target passes.","Consider councillor or scrutiny involvement where it would help secure action."];
      action='<button class="button primary" type="button" data-copy-template="complaint-followup">Copy complaint follow-up</button>';
    } else if (stage==="final-response") {
      const ombudsman = ombudsmanLinks[nation];
      title="Assess the final response and the independent review route";
      steps=["Identify which complaint points were answered and which remain unresolved.","State the personal or public impact of any alleged service failure.","Check the ombudsman's jurisdiction and time limits.","Provide the final response and a concise chronology."];
      action=`<a class="button primary" href="${ombudsman[1]}">Open ${ombudsman[0]}</a>`;
    } else {
      title="Make a focused request for recorded environmental information";
      steps=["Ask for information that already exists.","Specify the period and preferred reusable format.","Request policy, targets, data or recorded decision reasons rather than an opinion.","Record the normal 20-working-day response date."];
      action='<button class="button primary" type="button" data-copy-template="eir">Copy EIR structure</button>';
    }
    const result = $("#escalation-result");
    result.innerHTML = `<p class="eyebrow">Next-step plan</p><h2>${title}</h2>${ref?`<p><strong>Reference:</strong> ${ref}</p>`:""}<ol>${steps.map(step=>`<li>${step}</li>`).join("")}</ol><div class="route-actions">${action}<a class="button secondary" href="bodies.html">Find public body</a></div><p id="copy-status" class="small muted" aria-live="polite"></p>`;
    result.hidden = false;
    result.scrollIntoView({behavior:"smooth", block:"nearest"});
  });
}
document.addEventListener("click", async event => {
  const button = event.target.closest("[data-copy-template]");
  if (!button) return;
  const templates = {
    followup:"I am following up on fly-tipping report [REFERENCE], submitted on [DATE]. The issue remains unresolved. Please confirm the current status, the action that will now be taken and the date by which it will be completed.",
    complaint:"I am making a formal complaint about the handling of fly-tipping report [REFERENCE]. The complaint concerns [DELAY / MISSED COMMITMENT / COMMUNICATION]. The report was submitted on [DATE], and [ACTION] was promised by [DATE]. Please investigate the service handling, provide a clear action date and explain what will prevent a recurrence.",
    "complaint-followup":"I am following up on formal complaint [REFERENCE], submitted on [DATE]. Please confirm the response target and when I will receive the substantive complaint response.",
    eir:"Please provide the following recorded environmental information for the period [DATES]:\n\n1. The current fly-tipping investigation and clearance policy.\n2. Any published or internal response, inspection and clearance targets.\n3. Monthly incident and enforcement figures in CSV or spreadsheet format.\n4. The recorded criteria used to designate and review fly-tipping hotspots.\n\nPlease treat this as a request under the Environmental Information Regulations 2004."
  };
  const status = $("#copy-status");
  try {
    await navigator.clipboard.writeText(templates[button.dataset.copyTemplate]);
    if (status) status.textContent = "Template copied to the clipboard.";
  } catch {
    if (status) status.textContent = "Copy was blocked by the browser. Select and copy the wording manually.";
  }
});
