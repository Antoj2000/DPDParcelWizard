export const mockAccount = {
  id: "PW109736",

  firstName: "Anthony",
  lastName: "Johnson",

  emails: [
    {
      id: "email_1",
      value: "johnsonanto2000@gmail.com",
      isPrimary: true,
    },
    {
      id: "email_2",
      value: "anto.johnson@outlook.com",
      isPrimary: false,
    },
  ],

  mobileNumbers: [
    {
      id: "mob_1",
      value: "+353877766382",
      isPrimary: true,
    },
    {
      id: "mob_2",
      value: "+353861234567",
      isPrimary: false,
    },
  ],
  addresses: [
    {
      id: "addr_1",
      title: "Home",
      line1: "50 Valleycourt",
      line2: "Bonnavalley",
      line3: "Athlone",
      line4: "Co. Westmeath",
      eircode: "N37 P1H2",
      type: "home",
      isDefault: true,
    },
    {
      id: "addr_2",
      title: "Work",
      line1: "DPD Ireland Hub",
      line2: "Unit 4",
      line3: "Baldonnell",
      line4: "Dublin",
      eircode: "D22 F9K0",
      type: "work",
      isDefault: false,
    },
    {
      id: "addr_3",
      title: "Parents",
      line1: "5 Oak Drive",
      line2: "Castlebar",
      line3: "Castlebar",
      line4: "Mayo",
      eircode: "F23 Y9K1",
      type: "other",
      isDefault: false,
    },
  ],
};
