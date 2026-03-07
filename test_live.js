const data = {
  name: "Automated Bot Test",
  phone: "555-0199",
  serviceType: "domestic",
  address: "123 Bot Drive, Robot City",
  preferredDate: "2026-03-07"
};

fetch('https://mahi-ro-care-official.vercel.app/api/inquiries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(async (res) => {
  const status = res.status;
  const text = await res.text();
  console.log('--- LIVE ROUTE RESPONSE ---');
  console.log(`STATUS: ${status}`);
  console.log(`BODY: ${text}`);
})
.catch(err => console.error("Error making request:", err));
