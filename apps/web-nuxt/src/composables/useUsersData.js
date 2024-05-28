import { ref } from 'vue';

export const useUsersData = () => {
    const Users = ref([
      {
        id: 1,
        firstName: "Alex",
        lastName: "Johnson",
        password: "alex.johnson",
        email: "alex.johnson@example.com",
        groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }]
      },
      {
          id: 2,
          firstName: "Maria",
          lastName: "Rodriguez",
          password: "maria.rodriguez",
          email: "maria.rodriguez@example.com",
          groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }, { id: 4, name: "Group 4" }]
      },
      {
          id: 3,
          firstName: "David",
          lastName: "Smith",
          password: "david.smith",
          email: "david.smith@example.com",
          groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }]
      },
      {
          id: 4,
          firstName: "Sophia",
          lastName: "Brown",
          password: "sophia.brown",
          email: "sophia.brown@example.com",
          groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }, { id: 4, name: "Group 4" }, { id: 5, name: "Group 5" }]
      },
      {
          id: 5,
          firstName: "Ethan",
          lastName: "Taylor",
          password: "ethan.taylor",
          email: "ethan.taylor@example.com",
          groups: [{ id: 1, name: "Group 1" }]
      },
      {
          id: 6,
          firstName: "Olivia",
          lastName: "Martinez",
          password: "olivia.martinez",
          email: "olivia.martinez@example.com",
          groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }]
      },
      {
          id: 7,
          firstName: "James",
          lastName: "Wilson",
          password: "james.wilson",
          email: "james.wilson@example.com",
          groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }]
      },
      {
        id: 8,
        firstName: "Isabella",
        lastName: "Anderson",
        password: "isabella.anderson",
        email: "isabella.anderson@example.com",
        groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }, { id: 4, name: "Group 4" }]
    },
    {
        id: 9,
        firstName: "Logan",
        lastName: "Thomas",
        password: "logan.thomas",
        email: "logan.thomas@example.com",
        groups: [{ id: 1, name: "Group 1" }]
    },
    {
        id: 10,
        firstName: "Ava",
        lastName: "Jackson",
        password: "ava.jackson",
        email: "ava.jackson@example.com",
        groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }]
    },
    {
        id: 11,
        firstName: "Lucas",
        lastName: "White",
        password: "lucas.white",
        email: "lucas.white@example.com",
        groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }, { id: 4, name: "Group 4" }, { id: 5, name: "Group 5" }]
    },
    {
        id: 12,
        firstName: "Mia",
        lastName: "Harris",
        password: "mia.harris",
        email: "mia.harris@example.com",
        groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }]
    },
      ]);

    const Groups =ref([
        {
          id: 1,
          name: "Group 1",
          users: [
            "Alex Johnson",
            "Maria Rodriguez",
            "David Smith",
            "Sophia Brown",
            "Ethan Taylor",
            "Olivia Martinez",
            "James Wilson",
            "Isabella Anderson",
            "Logan Thomas",
            "Ava Jackson",
            "Lucas White",
            "Mia Harris",
            "Benjamin Clark",
            "Amelia Lewis",
            "Jacob Robinson",
            "Charlotte Walker",
            "Michael Hall",
            "Emily Young",
            "Elijah King",
            "Avery Wright",
            "Evelyn Scott",
            "Matthew Torres",
            "Abigail Lopez",
            "Daniel Hill",
            "Chloe Green",
            "William Adams",
            "Madison Nelson",
            "Alexander Baker",
            "Harper Gonzalez",
            "Noah Carter"
          ],
          template_fill: ["Invoice Form", "Registration Form", "Feedback Form"],
          template_edit: ["Survey Form", "Application Form", "Event Registration"]
        },
        {
          id: 2,
          name: "Group 2",
          users: [
            "Alex Johnson",
            "Maria Rodriguez",
            "David Smith",
            "Sophia Brown",
            "Olivia Martinez",
            "James Wilson",
            "Isabella Anderson",
            "Ava Jackson",
            "Lucas White",
            "Mia Harris",
            "Amelia Lewis",
            "Jacob Robinson",
            "Charlotte Walker",
            "Michael Hall",
            "Elijah King",
            "Avery Wright",
            "Evelyn Scott",
            "Abigail Lopez",
            "Daniel Hill",
            "Chloe Green",
            "Madison Nelson",
            "Alexander Baker",
            "Harper Gonzalez",
            "Noah Carter"
          ],
          template_fill: ["Employee Survey", "Product Feedback", "Customer Survey"],
          template_edit: ["Job Application", "Event Feedback", "Service Request Form"]
        },
        {
          id: 3,
          name: "Group 3",
          users: [
            "Alex Johnson",
            "Maria Rodriguez",
            "Sophia Brown",
            "Olivia Martinez",
            "Isabella Anderson",
            "Ava Jackson",
            "Lucas White",
            "Amelia Lewis",
            "Jacob Robinson",
            "Michael Hall",
            "Elijah King",
            "Evelyn Scott",
            "Abigail Lopez",
            "Madison Nelson",
            "Alexander Baker",
            "Noah Carter"
          ],
          template_fill: ["Order Form", "Booking Form", "Contract Agreement"],
          template_edit: ["Project Proposal", "Budget Plan", "Performance Review"]
        },
        {
          id: 4,
          name: "Group 4",
          users: [
            "Maria Rodriguez",
            "Sophia Brown",
            "Isabella Anderson",
            "Lucas White",
            "Jacob Robinson",
            "Michael Hall",
            "Evelyn Scott",
            "Alexander Baker",
            "Noah Carter"
          ],
          template_fill: [
            "Maintenance Request",
            "IT Support Ticket",
            "Travel Request"
          ],
          template_edit: ["Expense Report", "Inventory List", "Training Schedule"]
        },
        {
          id: 5,
          name: "Group 5",
          users: ["Sophia Brown", "Lucas White", "Michael Hall", "Noah Carter"],
          template_fill: [
            "Research Proposal",
            "Grant Application",
            "Scholarship Application"
          ],
          template_edit: ["Thesis Submission", "Course Outline", "Lecture Schedule"]
        },
        {
          id: 6,
          name: "Group 6",
          users: [
            "Ethan Taylor",
            "Logan Thomas",
            "Benjamin Clark",
            "Emily Young",
            "Matthew Torres",
            "William Adams"
          ],
          template_fill: ["Marketing Plan", "Sales Report", "Client Onboarding"],
          template_edit: ["Press Release", "Case Study", "Product Catalog"]
        },
        {
          id: 7,
          name: "Group 7",
          users: [
            "James Wilson",
            "Charlotte Walker",
            "Chloe Green",
            "Harper Gonzalez"
          ],
          template_fill: [
            "Health and Safety Report",
            "Risk Assessment",
            "Emergency Plan"
          ],
          template_edit: ["Compliance Checklist", "Audit Report", "Incident Report"]
        },
        {
          id: 8,
          name: "Group 8",
          users: ["Ava Jackson", "Mia Harris", "Avery Wright", "Abigail Lopez"],
          template_fill: ["User Guide", "FAQ Document", "Software Documentation"],
          template_edit: [
            "Technical Specification",
            "Release Notes",
            "API Documentation"
          ]
        },
        {
          id: 9,
          name: "Group 9",
          users: ["Daniel Hill", "Madison Nelson", "Elijah King", "Evelyn Scott"],
          template_fill: ["Business Plan", "Financial Forecast", "Investor Pitch"],
          template_edit: ["Market Analysis", "Competitor Analysis", "SWOT Analysis"]
        },
        {
          id: 10,
          name: "Group 10",
          users: ["Alexander Baker", "Noah Carter", "Lucas White", "Michael Hall"],
          template_fill: ["Policy Document", "Procedure Manual", "Training Manual"],
          template_edit: [
            "Operational Guidelines",
            "Quality Assurance Procedures",
            "Staff Handbook"
          ]
        },
        {
          id: 11,
          name: "Group 11",
          users: ["Sophia Brown", "Jacob Robinson", "Ethan Taylor", "Ava Jackson"],
          template_fill: [
            "Project Charter",
            "Scope Statement",
            "Work Breakdown Structure"
          ],
          template_edit: [
            "Project Schedule",
            "Risk Management Plan",
            "Stakeholder Register"
          ]
        },
        {
          id: 12,
          name: "Group 12",
          users: [
            "Maria Rodriguez",
            "David Smith",
            "James Wilson",
            "Charlotte Walker"
          ],
          template_fill: ["Content Calendar", "Editorial Guidelines", "Style Guide"],
          template_edit: [
            "Publishing Schedule",
            "Content Strategy",
            "Audience Analysis"
          ]
        },
        {
          id: 13,
          name: "Group 13",
          users: ["Logan Thomas", "Mia Harris", "Benjamin Clark", "Emily Young"],
          template_fill: [
            "Recruitment Plan",
            "Job Descriptions",
            "Interview Questions"
          ],
          template_edit: [
            "Onboarding Checklist",
            "Performance Evaluation",
            "Training Plan"
          ]
        },
        {
          id: 14,
          name: "Group 14",
          users: ["Isabella Anderson", "Lucas White", "Amelia Lewis", "Elijah King"],
          template_fill: ["Budget Template", "Expense Form", "Purchase Order"],
          template_edit: [
            "Financial Statement",
            "Invoice Template",
            "Cost Benefit Analysis"
          ]
        },
        {
          id: 15,
          name: "Group 15",
          users: ["Avery Wright", "Evelyn Scott", "Matthew Torres", "Abigail Lopez"],
          template_fill: [
            "Meeting Agenda",
            "Minutes Template",
            "Action Item Tracker"
          ],
          template_edit: [
            "Decision Log",
            "Meeting Schedule",
            "Stakeholder Communication Plan"
          ]
        },
        {
          id: 16,
          name: "Group 16",
          users: ["Daniel Hill", "Chloe Green", "William Adams", "Harper Gonzalez"],
          template_fill: [
            "Customer Profile",
            "Sales Lead Form",
            "Quotation Template"
          ],
          template_edit: [
            "Sales Report",
            "Customer Feedback Form",
            "Service Level Agreement"
          ]
        },
        {
          id: 17,
          name: "Group 17",
          users: ["Madison Nelson", "Alexander Baker", "Noah Carter", "Alex Johnson"],
          template_fill: ["Event Plan", "Guest List", "Venue Contract"],
          template_edit: ["Event Budget", "Promotional Material", "Post-Event Survey"]
        },
        {
          id: 18,
          name: "Group 18",
          users: [
            "Sophia Brown",
            "Ethan Taylor",
            "James Wilson",
            "Isabella Anderson"
          ],
          template_fill: ["Social Media Strategy", "Campaign Plan", "Content Ideas"],
          template_edit: [
            "Analytics Report",
            "Engagement Plan",
            "Social Media Calendar"
          ]
        },
        {
          id: 19,
          name: "Group 19",
          users: ["David Smith", "Logan Thomas", "Mia Harris", "Lucas White"],
          template_fill: [
            "Website Wireframe",
            "User Flow Diagram",
            "Functionality Specification"
          ],
          template_edit: ["Site Map", "Design Mockup", "User Testing Plan"]
        },
        {
          id: 20,
          name: "Group 20",
          users: [
            "Amelia Lewis",
            "Benjamin Clark",
            "Charlotte Walker",
            "Emily Young"
          ],
          template_fill: [
            "Sustainability Report",
            "Environmental Policy",
            "Waste Management Plan"
          ],
          template_edit: [
            "Energy Audit",
            "Carbon Footprint Calculation",
            "Green Procurement Policy"
          ]
        }
      ]);
    return { Users, Groups };
};