/* SETTINGS */

export type Settings = {
  seo: SeoDTO;
  pagination: PaginationDTO;
  isSidebarDesktopOpen: boolean,
};

export type SeoDTO = {
  seo_title: string;
  seo_description: string;
};

export type PaginationDTO = {
  limit: number;
  offset: number;
  orderBy: string;
  orderDir: string;
  searchBy: string;
};

export type APIResponseHandler = {
  status: string;
  description: string;
  type: string;
};

/* USER */

export type User = {
  name: string;
  email: string;
  role: string[];
  language: string;
  isValid: true;
};

export type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  postalNumber: string;
  postal: string;
  officialBeekeeperID?: string;
  nif?: number;
}

export type NewApiary = {
  id?: number;
  name: string;
  numberOfHives: number;
  productionGoal: string;
  productionType: string;
  municipality: string;
  parish: string;
  place: string;
  latitude: number;
  longitude: number;
  isApproved: boolean;
}

export type Apiary = {
  id?: number;
  name?: string;
  numberOfHives: number;
  productionGoal: string;
  productionType: string;
  location: {
    municipality: string;
    parish: string;
    place: string;
    latitude: number;
    longitude: number;
  },
  isApproved: string;
}

export type Apiaries = {
  apiaries: Apiary[],
  hives: Hive[]
}

export type Hive = {
  id: number;
  name: string;
  apiaryID: number;
  apiaryName: string;
}

export type NewHive = {
  apiaryID: number;
  name: string;
}

export type FieldBook = {
  inspections: Inspection;
  transfers: Transfer[];
  crestas: Cresta[];
  schedule: Schedule[];
}

export type NewInspection = {
  apiaryID: number;
  date: string;
  // Maintenance
  idMaintenance?: number;
  hiveIDmaintenance: string
  temperature: string;
  humidity: string;
  inspectionType: string;
  motive: string;
  disinfectionMode: string;
  productsUsed: string;
  observations: string;
  // Feeding
  idFeeding?: number;
  hiveIDfeeding: string;
  product: string;
  formula: string;
  origin: string;
  doseFood: string;
  // Disease Treatment
  idTreatment?: number;
  hiveIDdisease: string;
  type: string;
  disease: string;
  medication: string;
  activeSubstance: string;
  doseTreatment: string;
  duration: string;
  endDate: string;
}

export type Inspection = {
  maintenance: MaintenanceType[];
  feeding: FeedingType[];
  treatments: TreatmentsType[];
}

export type MaintenanceType = {
  id?: number;
  apiaryID: number;
  hiveID: number[];
  date: string;
  temperature: string;
  humidity: string;
  inspectionType: string;
  motive: string;
  disinfectionMode: string;
  productsUsed: string;
  observations: string;
};

export type FeedingType = {
  id?: number;
  apiaryID: number;
  hiveID: number[];
  date: string;
  product: string;
  formula: string;
  origin: string;
  dose: string;
};

export type TreatmentsType = {
  id?: number;
  apiaryID: number;
  hiveID: number[];
  date: string;
  type: string;
  disease: string;
  medication: string;
  activeSubstance: string;
  dose: string;
  duration: string;
  endDate: string;
};

export type Transfer = {
  id?: number;
  transferDate: string;
  apiaryID: number;
  location: {
    municipality: string;
    parish: string;
    place: string;
    latitude: number;
    longitude: number;
  },
  isDgavApproved: string;
  isControledZoneApproved: string;
  isTransferApproved: string;
}

export type NewTransfer = {
  transferDate: string;
  apiaryID: number;
  municipality: string;
  parish: string;
  place: string;
  latitude: number;
  longitude: number;
}

export type Cresta = {
  id?: number;
  apiaryID: number;
  hiveID: number;
  nrOfBoards: number;
  ProductType: string;
  quantity: number;
  quantityType: string;
  CrestaDate: string;
}

export type NewCresta = {
  id?: number;
  apiaryID: number;
  hiveID: number;
  nrOfBoards: number;
  ProductType: string;
  quantity: number;
  quantityType: string;
  CrestaDate: string;
}

export type Schedule = {
  apiaryID: number;
  date: string;
}

export type NewHiveSplit = {
  apiaryID: number;
  hiveOrigID: number;
  listOfHiveDestID: string;
  reproductionQueen: string;
  reproductionManagement: string;
  hiveSplitDate: string;
  productionType: string;
  quantitiy: number;
  quantityType: string;
}

export type HiveSplit = {
  id?: number,
  apiary: number,
  hiveOrigID: number,
  listOfHiveDestID: number[],
  reproductionQueen: string,
  reproductionManagement: string,
  hiveSplitDate: string,
  productionType: string,
  quantitiy: number,
  quantityType: string
}

export type HiveSplitList = {
  hivesplits: HiveSplit[],
}

export type Beekeeper = {
  beekeeperOfficialID: string;
  beekeeperAddress: string;
  beekeeperPhoneNumber: number;
  beekeeperNif: number;
}

export type Declarations = {
  documents: Document[];
  beekeeper: Beekeeper;
  apiaryInfo: ApiaryInfo[];
  listApiarysWithInfo: ApiaryTotalInfo[];
}

export type NewDocument = {
  version: number;
  declarationType: string;
  year: string;
  unidadeOrganica: string;
}

export type NewDocumentApiaryInfo = {
  municipality: string;
  parish: string;
  place: string;
  latitude: number;
  longitude: number;
  placeName: string;
  culturaIntensiva: boolean;
  hiveNumber: number;
  hiveSuperNumber: number;
  colonynumber: number;
  transfer: boolean;
  controledZone: boolean;
  apiaryId: number;
  documentNumber: number;
}

export type Document = {
  documentNumber: number;
  version: number;
  declarationType: string;
  year: string;
  officialBeekeeperId: string;
  submissionDate: string;
  unidadeOrganica: string;
  details: TotalDetails;
}

export type ApiaryInfo = {
  apiaryId: number;
  apiaryLocation: {
    municipality: string;
    parish: string;
    place: string;
    latitude: number;
    longitude: number;
  },
  placeName: string;
  culturaIntensiva: boolean;
  hiveNumber: number;
  hiveSuperNumber: number;
  transfer: boolean;
  controledZone: boolean;
  documentNumber: number;
}

export type TotalDetails = {
  listApiarysWithInfo: ApiaryTotalInfo[];
  totalApiaryNumber: number;
  totalHiveNumber: number;
  totalHiveSuperNumber: number;
}

export type ApiaryTotalInfo = {
  apiaryId: number;
  apiaryLocation: {
    municipality: string;
    parish: string;
    place: string;
    latitude: number;
    longitude: number;
  },
  placeName: string;
  culturaIntensiva: boolean;
  hiveNumber: number;
  hiveSuperNumber: number;
  transfer: boolean;
  controledZone: boolean;
  documentNumber: number;
}


/* OTHERS */

export type DateInterval = {
  from: Date;
  to: Date;
};

export type OptionsMerged = {
  id: number;
  value: string;
  custom: boolean;
  uniqueKey: string;
}

export type Options = {
  id: number;
  value: string;
  custom: boolean;
}