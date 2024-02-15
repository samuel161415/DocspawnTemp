export const sampleData = [
  {
    id: 1,
    creationDate: '2024-01-01',
    creationTime: '08:30',
    templateName: 'Invoice Template',
    numberOfDocuments: 5,
    creator: 'John Doe',
  },
  {
    id: 2,
    creationDate: '2024-01-15',
    creationTime: '09:45',
    templateName: 'Report Template',
    numberOfDocuments: 3,
    creator: 'Jane Smith',
  },
  {
    id: 3,
    creationDate: '2024-02-20',
    creationTime: '10:00',
    templateName: 'Contract Template',
    numberOfDocuments: 8,
    creator: 'Carlos Rodriguez',
  },
]

export const CustomerService = [
  {
    id: 1000,
    name: 'James Butt',
    country: {
      name: 'Algeria',
      code: 'dz',
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
    },
    balance: 70663,
  },
  {
    id: 1002,
    name: 'Jkames',
    country: {
      name: 'Algeria',
      code: 'dz',
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
    },
    balance: 70663,
  },
  {
    id: 1003,
    name: 'James',
    country: {
      name: 'Algeria',
      code: 'dz',
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
    },
    balance: 70663,
  },
]
export const step1Items = [
  '1-10',
  '11-25',
  '26-250',
  '26-250',
  '256-500',
  '500-2000',
  '2001+',
]

export const step2Items = [
  'Tik-tok',
  'Linked in',
  'Facebook',
  'Instagram',
  'Tweeter',
  'Youtube',
  'Friend',
]
export const step3Items = [
  'Me only',
  '2-10',
  '11-25',
  '26-250',
  '26-250',
  '256-500',
  'More than 501',
  'I don\'t know',
]
export const documentLibraryData = [
  {
    id: 1,
    type: 'Form to Doc',
    template_name: 'INVOICE FORM',
    no_documents: 1,
    date: formatDate('2024-01-01'),
  },
  {
    id: 2,
    type: 'Form to Doc',
    template_name: 'FORM',
    no_documents: 1,
    date: formatDate('2024-01-15'),
  },
  {
    id: 3,
    type: 'Form to Doc',
    template_name: 'FORM',
    no_documents: 1,
    date: formatDate('2024-02-20'),
  },
  {
    id: 4,
    type: 'Form to Doc',
    template_name: 'FORM',
    no_documents: 1,
    date: formatDate('2024-01-01'),
  },
  {
    id: 5,
    type: 'Form to Doc',
    template_name: 'INVOICE FORM',
    no_documents: 1,
    date: formatDate('2024-01-15'),
  },
  {
    id: 6,
    type: 'Form to Doc',
    template_name: 'RESUME FORM',
    no_documents: 1,
    date: formatDate('2024-03-10'),
  },
  {
    id: 7,
    type: 'Form to Doc',
    template_name: 'APPLICATION FORM',
    no_documents: 1,
    date: formatDate('2024-04-05'),
  },
  {
    id: 8,
    type: 'Form to Doc',
    template_name: 'SURVEY FORM',
    no_documents: 1,
    date: formatDate('2024-02-28'),
  },
  {
    id: 9,
    type: 'Form to Doc',
    template_name: 'FEEDBACK FORM',
    no_documents: 1,
    date: formatDate('2024-03-15'),
  },
  {
    id: 10,
    type: 'Form to Doc',
    template_name: 'REGISTRATION FORM',
    no_documents: 1,
    date: formatDate('2024-04-20'),
  },
  {
    id: 11,
    type: 'Form to Doc',
    template_name: 'EMPLOYEE SURVEY',
    no_documents: 1,
    date: formatDate('2024-05-05'),
  },
  {
    id: 12,
    type: 'Form to Doc',
    template_name: 'EVENT REGISTRATION',
    no_documents: 1,
    date: formatDate('2024-06-10'),
  },
  {
    id: 13,
    type: 'Form to Doc',
    template_name: 'PRODUCT FEEDBACK',
    no_documents: 1,
    date: formatDate('2024-07-15'),
  },
  {
    id: 14,
    type: 'Form to Doc',
    template_name: 'CUSTOMER SURVEY',
    no_documents: 1,
    date: formatDate('2024-08-20'),
  },
  {
    id: 15,
    type: 'Form to Doc',
    template_name: 'JOB APPLICATION',
    no_documents: 1,
    date: formatDate('2024-09-01'),
  },
]

function formatDate(inputDate) {
  const formattedDate = new Date(inputDate)
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Intl.DateTimeFormat('en-US', options).format(formattedDate)
}
