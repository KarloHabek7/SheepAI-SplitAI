import { FunctionDeclaration, SchemaType } from "@google/generative-ai";

/**
 * Declarations for the "Civic Market" tools.
 * These tools allow the Split Zmaj assistant to interact with city services
 * like Gradsko Oko (issue reporting) and Pazar (local market deals).
 */
export const civicMarketTools: FunctionDeclaration[] = [
  {
    name: "submit_gradsko_oko_report",
    description: "Submit a new civic issue report to the 'Gradsko Oko' system. Use this when a user describes a problem in the city like broken infrastructure, illegal waste, graffiti, or green area maintenance issues.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        category: {
          type: SchemaType.STRING,
          description: "The category of the civic issue.",
          format: "enum",
          enum: ["Bulk Waste", "Infrastructure", "Green Areas", "Graffiti", "Other"],
        },
        description: {
          type: SchemaType.STRING,
          description: "A detailed description of the problem provided by the user.",
        },
        location: {
          type: SchemaType.STRING,
          description: "The location of the issue (address, landmark, or coordinates if known).",
        },
        zone: {
          type: SchemaType.STRING,
          description: "The city district or zone where the issue is located.",
          format: "enum",
          enum: [
            "Gripe", "Spinut", "Varoš", "Meje", "Trstenik", "Pujanke", 
            "Sućidar", "Split 3", "Bačvice", "Mejaši", "Žnjan", "Bol", 
            "Grad", "Other"
          ],
        },
        severity: {
          type: SchemaType.STRING,
          description: "The perceived severity of the issue.",
          format: "enum",
          enum: ["Low", "Medium", "High", "Critical"],
        },
      },
      required: ["category", "description"],
    },
  },
  {
    name: "submit_pazar_listing",
    description: "Submit a new local market deal or listing to the 'Pazar' system. Use this when a user wants to share a great price or availability of a product at the local market.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        itemName: {
          type: SchemaType.STRING,
          description: "The name of the item or product (e.g., 'Fresh Cherries', 'Sardines').",
        },
        category: {
          type: SchemaType.STRING,
          description: "The category of the product.",
        },
        price: {
          type: SchemaType.STRING,
          description: "The price and unit (e.g., '3 EUR/kg', '5 EUR for 2').",
        },
        vendorName: {
          type: SchemaType.STRING,
          description: "The name of the vendor or booth, if provided.",
        },
      },
      required: ["itemName", "price"],
    },
  },
];

/**
 * Declarations for Utility & Emergency tools.
 * These tools provide real-time information about city services and safety.
 */
export const utilityEmergencyTools: FunctionDeclaration[] = [
  {
    name: "check_parking_availability",
    description: "Check for available parking spaces in a specific city zone. Use this when a user asks where they can park or if there is space in a certain district.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        zone: {
          type: SchemaType.STRING,
          description: "The city district or zone to check for parking.",
          format: "enum",
          enum: [
            "Gripe", "Spinut", "Varoš", "Meje", "Trstenik", "Pujanke", 
            "Sućidar", "Split 3", "Bačvice", "Mejaši", "Žnjan", "Bol", 
            "Grad", "Other"
          ],
        },
      },
      required: ["zone"],
    },
  },
  {
    name: "get_bus_eta",
    description: "Get the estimated time of arrival (ETA) for a specific bus route at a given stop. Use this for queries like 'When is the next 37 bus?' or 'Bus 6 status at Spinut'.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        routeNumber: {
          type: SchemaType.STRING,
          description: "The number or identifier of the bus route (e.g., '37', '6', '18').",
        },
        stopName: {
          type: SchemaType.STRING,
          description: "The name of the bus stop.",
        },
      },
      required: ["routeNumber", "stopName"],
    },
  },
  {
    name: "get_dir_index",
    description: "Search the city directory index for contact info or location details of municipal offices and services. Use this for queries like 'Where is the city hall?' or 'Contact for komunalni redari'.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        location: {
          type: SchemaType.STRING,
          description: "The name of the office, service, or landmark to look up.",
        },
      },
    },
  },
  {
    name: "get_emergency_info",
    description: "Retrieve critical safety information and contact details for specific emergency types. Use this for urgent queries like 'Who to call for a water leak?' or 'Emergency medical contact'.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        emergencyType: {
          type: SchemaType.STRING,
          description: "The type of emergency.",
          format: "enum",
          enum: ["Fire", "Medical", "Police", "Utility", "Other"],
        },
      },
      required: ["emergencyType"],
    },
  },
];

/**
 * The master list of all tool declarations for the Split Zmaj assistant.
 */
export const TOOL_DECLARATIONS: FunctionDeclaration[] = [
  ...civicMarketTools,
  ...utilityEmergencyTools,
];
