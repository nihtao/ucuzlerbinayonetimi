const fs = require('fs');
let content = fs.readFileSync('utils/blogData.ts', 'utf8');

const translations = [
  {
    en_baslik: 'My apartment is empty, do I still have to pay dues?',
    en_ozet: 'Dues are not a usage fee; they are the cost of maintaining the building. Even if your apartment is empty, paying dues is a legal obligation.',
    en_detayli_icerik: `
      <p>One of the most common questions is: <strong>"My apartment is empty, nobody lives there, why do I have to pay dues?"</strong></p>
      <br />
      <p>The Condominium Law (KMK) explains this very clearly. Dues are not just a "usage" fee for things like the elevator or garbage collection. Dues are for sharing all the expenses made for the main real estate to <strong>survive and maintain its value</strong>.</p>
      <br />
      <h3>Why Should You Pay?</h3>
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px;">
        <li><strong>Personnel Expenses:</strong> The salary of the attendant, security, or cleaning personnel continues to be paid even if your apartment is empty.</li>
        <li><strong>Common Area Maintenance:</strong> Roof repairs, periodic elevator maintenance, landscaping, and exterior operations protect the value of the entire building. This directly affects the value of your apartment.</li>
        <li><strong>Fixed Expenses:</strong> Expenses such as common lighting, hydrophore, central heating (a certain share) occur regardless of whether the apartment is empty or not.</li>
      </ul>
      <br />
      <p><strong>In summary:</strong> Pursuant to Article 20 of the Condominium Law; Each of the flat owners is obliged to participate in the common expenses unless there is another agreement among them.</p>
    `,
    en_etiket: 'LEGAL INFO'
  },
  {
    en_baslik: 'What happens if I do not pay my dues on time?',
    en_ozet: 'According to the Condominium Law, a monthly delay penalty of 5% is applied for dues not paid on time. In case of debt accumulation, enforcement proceedings are initiated.',
    en_detayli_icerik: `
      <p>Regular collection of dues is vital to ensure that services in common living areas are not interrupted. So, what legal sanctions does a flat owner face if they do not pay their dues on time?</p>
      <br />
      <h3>5% Monthly Delay Penalty</h3>
      <p>Pursuant to Article 20 of the Condominium Law (KMK), a flat owner who does not pay their full share of common expenses and advances on time is obliged to pay a <strong>delay penalty calculated at five percent (5%) per month</strong> for the days delayed.</p>
      <br />
      <h3>Enforcement Proceedings and Litigation Process</h3>
      <p>The manager or any of the other flat owners may initiate <strong>enforcement proceedings</strong> against a flat owner who insists on not paying their dues debt. During the enforcement process, in addition to the principal debt; attorney fees, execution expenses, and delay penalties are also reflected on the debtor.</p>
    `,
    en_etiket: 'LEGISLATION WARNING'
  },
  {
    en_baslik: 'Who covers common area damages?',
    en_ozet: 'Damages occurring in common usage areas are covered jointly by all flat owners in proportion to their land share if the person causing the damage cannot be identified.',
    en_detayli_icerik: `
      <p>Areas such as inside the building, stairwells, elevators, garden or parking lot have "common area" status. How damages in these areas will be covered is frequently a subject of debate.</p>
      <br />
      <h3>If the Person Causing Damage is Known:</h3>
      <p>If it can be identified by camera records or minutes who caused the damage in the common area, the repair cost is collected directly from that person.</p>
      <br />
      <h3>If the Person Causing Damage Cannot be Identified:</h3>
      <p>If the damage occurred naturally or the person causing it cannot be identified; the cost is covered <strong>by all flat owners</strong> in proportion to their land share.</p>
    `,
    en_etiket: 'INFORMATION'
  },
  {
    en_baslik: 'Does the tenant or the landlord pay for roof repair costs?',
    en_ozet: 'Fixture expenses that increase the value of the main real estate, such as roof repair, exterior insulation, and elevator replacement, belong to the landlord.',
    en_detayli_icerik: `
      <p>Expenses in apartment or site management are divided into two: <strong>Operating Expenses (Usage)</strong> and <strong>Fixture Expenses (Investment)</strong>.</p>
      <br />
      <h3>Fixture Expenses (Belongs to Landlord)</h3>
      <p>Expenditures that add permanent value such as roof replacement, replacement of elevator motor, exterior painting or insulation of the building are the responsibility of the <strong>flat owner (landlord)</strong>. The tenant is not obliged to pay these costs.</p>
      <br />
      <h3>Operating Expenses (Belongs to Tenant)</h3>
      <p>Expenses arising from the daily use of the building such as periodic elevator maintenance, stair automation, janitor salary, and common area cleaning materials belong to the <strong>tenant</strong>.</p>
      <br />
      <p><strong>Note:</strong> If the management wants to collect the money from the tenant for an urgent roof repair, the tenant can pay this cost and deduct it from the rental price along with the receipt (depending on their contract terms).</p>
    `,
    en_etiket: 'LEGAL INFO'
  },
  {
    en_baslik: 'Can a professional manager be appointed from outside?',
    en_ozet: 'Yes, according to the Condominium Law, a professional management company from outside the flat owners can be appointed to manage your apartment or site.',
    en_detayli_icerik: `
      <p>The board of flat owners can choose a manager among themselves, or pursuant to KMK Article 34, they can also appoint a <strong>real or legal person (company) from outside</strong> as a manager.</p>
      <br />
      <h3>Advantages of Professional Management</h3>
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px;">
        <li><strong>Impartiality:</strong> Dues collections and legal processes are carried out objectively without damaging neighborly relations.</li>
        <li><strong>Transparency:</strong> Income-expense statements are kept according to professional accounting standards and are always ready for audit.</li>
        <li><strong>Legal Assurance:</strong> Legal responsibilities such as changing laws, SGK declarations, and occupational safety are followed by experts.</li>
      </ul>
      <br />
      <p>A decision taken by both number and land share majority at the Flat Owners Board meeting is sufficient for the appointment.</p>
    `,
    en_etiket: 'MANAGEMENT'
  },
  {
    en_baslik: 'Can I enclose my balcony with glass?',
    en_ozet: 'Enclosing the balcony with folding glass (glass balcony) may not require permission according to Supreme Court decisions if it does not significantly spoil the exterior appearance of the building, but color harmony must be observed.',
    en_detayli_icerik: `
      <p>The issue of enclosing balconies is evaluated under the "alteration of architectural project" in the Condominium Law. While old Supreme Court decisions completely prohibited it, current decisions have taken technological developments into account.</p>
      <br />
      <h3>The Glass Balcony Rule</h3>
      <p>If the enclosing process is <strong>done with fixed windows (PVC/Aluminum joinery etc.)</strong> and included in the closed area, the written consent of 5/4 of all flat owners is required.</p>
      <p>However, profileless or thin-profile <strong>folding glass systems (glass balcony)</strong> are generally considered legal as long as they do not spoil the general exterior aesthetics of the building and do not damage the load-bearing system.</p>
      <br />
      <h3>The Management Plan is Essential</h3>
      <p>Still, the most definitive rule is your site/apartment's <strong>Management Plan</strong>. If a clause such as "Balconies cannot be enclosed in any way" or "Can only be enclosed with transparent glass and anthracite color profile" has been put in the plan beforehand, these rules must be strictly followed.</p>
    `,
    en_etiket: 'LEGISLATION'
  },
  {
    en_baslik: 'What are the rules for keeping pets?',
    en_ozet: 'Whether pets can be kept on the site depends primarily on the Management Plan. If there is no explicit prohibition in the plan, they can be kept provided they do not disturb the surroundings.',
    en_detayli_icerik: `
      <p>Disputes regarding pets are among the most common problems in building management. The legal framework works as follows:</p>
      <br />
      <h3>1. Management Plan Check</h3>
      <p>Pursuant to the Condominium Law, the apartment/site management plan is in the nature of a contract. If the management plan contains a clause stating "Pets such as cats, dogs, birds, etc. cannot be kept in independent sections (flats)", the courts consider this prohibition valid and may issue an eviction order.</p>
      <br />
      <h3>2. What are the Rules if There is No Prohibition?</h3>
      <p>If no prohibition is specified in the management plan, you can keep a pet in your independent section. However, pursuant to KMK Article 18; flat owners are obliged not to disturb each other and to comply with the rules of integrity.</p>
      <br />
      <p>In other words, if your dog makes excessive noise by constantly barking, dirties common areas, or exhibits aggressive behavior, your neighbors can make a justified complaint and initiate a legal process.</p>
    `,
    en_etiket: 'LIFE GUIDE'
  },
  {
    en_baslik: 'What is a resolution book, why is it important?',
    en_ozet: 'All decisions taken at Flat Owners Board meetings must be written and signed in the notary-approved Resolution Book. Otherwise, the decisions are legally invalid.',
    en_detayli_icerik: `
      <p>Every serious operational decision, dues increase, manager election, or fixture investment in your building or site is taken by the decision of the Flat Owners Board.</p>
      <br />
      <h3>Legal Nature of the Resolution Book</h3>
      <p>If what is discussed at the meeting remains only in words or is written on a piece of paper, it has no legal binding. The law commands that all these decisions be recorded in the Resolution Book (Flat Owners Board Resolution Book), the pages of which have been <strong>sealed and approved by the Notary</strong> beforehand.</p>
      <br />
      <h3>Important Rules:</h3>
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px;">
        <li>Decisions are recorded in the book along with the names and signatures of the attendees.</li>
        <li>Those who cast an opposing vote (dissenters) can write their reasons for rejection in the book and sign it.</li>
        <li>It is required to have the book closed/visad by a notary by the end of January each year (according to the old law) or at the end of the manager's term of office.</li>
      </ul>
      <p>Professional management companies guarantee that books are kept and stored in full compliance with the law.</p>
    `,
    en_etiket: 'LEGISLATION'
  },
  {
    en_baslik: 'How are parking spaces shared?',
    en_ozet: 'The use of parking lots, which are common areas, is determined according to the land share ratio or the allocation sketch in the Management Plan.',
    en_detayli_icerik: `
      <p>In-site vehicle parking spaces are one of the frequent neighborly disputes.</p>
      <br />
      <h3>Main Rule</h3>
      <p>If there is no parking allocation sketch attached to the Management Plan registered in the title deed, and if parking does not appear as an annex in your title deed; parking lots are <strong>common usage areas.</strong> Everyone has the right to use them.</p>
      <br />
      <h3>Vehicle Limit Per Flat</h3>
      <p>If the area is not enough for all flats, the Flat Owners Board can convene and determine the usage procedure (e.g., granting only 1 vehicle entry right per flat). Fairness can be ensured by establishing password/remote controlled access systems by board decision.</p>
      <br />
      <p>No flat owner can occupy the common parking area by erecting an iron, pulling a chain, or putting up a sign saying "This is my place".</p>
    `,
    en_etiket: 'LIFE GUIDE'
  },
  {
    en_baslik: 'What should be done if the elevator gets a red label?',
    en_ozet: 'The use of elevators that receive a red label (unusable) must be stopped immediately and the deficiencies must be resolved and revised within 60 days at the latest.',
    en_detayli_icerik: `
      <p>If your elevator has received a <strong>Red Label</strong> as a result of the annual periodic checks carried out by Type A Inspection Bodies, the use of this elevator is dangerous in terms of life safety.</p>
      <br />
      <h3>Manager's Responsibility</h3>
      <p>The manager (or professional management) is obliged to close the red-labeled elevator to use immediately and initiate the repair processes to the authorized service. The necessary budget is urgently collected from the flat owners (This is a fixture expense, it is taken from the landlords).</p>
      <br />
      <h3>What Happens if Use Continues?</h3>
      <p><strong>The building manager is directly legally and criminally responsible</strong> for any loss of life and property to be experienced in red-labeled elevators that are not closed and cause an accident. Even if the victim is considered faulty in cases of knowingly boarding, the main responsibility belongs to the management.</p>
      <p>In addition, municipalities physically seal elevators whose deficiencies have not been resolved at the end of the 60-day period.</p>
    `,
    en_etiket: 'SECURITY INFO'
  },
  {
    en_baslik: 'Your legal rights against neighbor noise',
    en_ozet: 'Flat owners are obliged not to disturb their neighbors and not to make noise while using their own independent sections.',
    en_detayli_icerik: `
      <p>The most basic rule of communal living in apartments and sites is not to disturb others.</p>
      <br />
      <h3>Condominium Law Article 18</h3>
      <p>The law clearly states: Flat owners are obliged to comply with the rules of integrity, <strong>especially not to disturb each other</strong>, while using both independent sections and annexes and common places.</p>
      <br />
      <h3>What Can Be Done?</h3>
      <p>First of all, a written warning can be drawn up through the management against a neighbor who constantly listens to loud music, makes noise late at night, or carries out inappropriate renovations in their house.</p>
      <p>If the situation does not improve, an application can be made to the Civil Court of Peace and the judge's intervention can be requested. If the noise is detected, the judge decides to stop this violation. In fact, if it continues, legal sanctions (administrative fines and, as a last resort, forced transfer of the house) may even be on the agenda.</p>
    `,
    en_etiket: 'LEGAL INFO'
  },
  {
    en_baslik: 'Who can attend the general assembly meeting?',
    en_ozet: 'Only flat owners who hold a title deed or their representatives to whom they have given notary-approved/written power of attorney can attend ordinary or extraordinary general assembly meetings.',
    en_detayli_icerik: `
      <p>Who can attend and vote at the Flat Owners General Assembly Meetings, which determine the fate of the building, is fixed by law.</p>
      <br />
      <h3>Only Flat Owners</h3>
      <p>The right to speak and vote at the meeting belongs <strong>only to the landlords (flat owners)</strong>. Even if tenants attend the meeting, they cannot vote and cannot be elected as manager unless they bring a written power of attorney from the landlord (unless otherwise stated in the management plan).</p>
      <br />
      <h3>Power of Attorney Rule</h3>
      <p>If a flat owner cannot attend the meeting in person, they can have themselves represented by giving a written power of attorney to someone they trust. However, a person cannot be appointed as a proxy to use more than <strong>five percent (5%)</strong> of the number of votes. In buildings with forty or fewer independent sections, one person can represent a maximum of <strong>two people</strong>.</p>
    `,
    en_etiket: 'MANAGEMENT'
  }
];

let currentIndex = 0;
content = content.replace(/id:\s*\d+,[\s\S]*?tarih:\s*"[^"]+"\s*\}/g, (match) => {
  if (currentIndex >= translations.length) return match;
  const trans = translations[currentIndex++];
  let injected = match.replace(/\}$/, 
    '  en_baslik: ' + JSON.stringify(trans.en_baslik) + ',\n' +
    '    en_ozet: ' + JSON.stringify(trans.en_ozet) + ',\n' +
    '    en_detayli_icerik: ' + JSON.stringify(trans.en_detayli_icerik) + ',\n' +
    '    en_etiket: ' + JSON.stringify(trans.en_etiket) + '\n' +
    '  }'
  );
  return injected;
});

fs.writeFileSync('utils/blogData.ts', content, 'utf8');
console.log('Successfully injected English translations into utils/blogData.ts');
