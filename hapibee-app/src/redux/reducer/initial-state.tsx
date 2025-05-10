import { HiveSplitList, Apiaries, FieldBook, Settings, User, Declarations } from "src/model/myTypes";

export const InitialStateSettings: Settings = {
  seo: {
    seo_title: "Typescript App",
    seo_description: "This is a react typescript template",
  },
  pagination: {
    limit: 5,
    offset: 0,
    orderBy: "",
    orderDir: "ASC",
    searchBy: "",
  },
  isSidebarDesktopOpen: false,
};

export const InitialStateUser: User = {
  isValid: true,
  name: "",
  email: "",
  role: [],
  language: "en",
};

export const InitialStateApiaries: Apiaries = {
  apiaries: [],
  hives: [],
}

export const InitialStateFiedBook: FieldBook = {
  inspections: {
    maintenance: [],
    feeding: [],
    treatments: []
  },
  transfers: [],
  crestas: [],
  schedule: [],
}

export const InitialStateHiveSplitList: HiveSplitList = {
  hivesplits: [],
}

export const InitialStateDeclarations: Declarations = {
  documents: [],
  beekeeper: {
    beekeeperOfficialID: "",
    beekeeperAddress: "",
    beekeeperPhoneNumber: 0,
    beekeeperNif: 0
  },
  apiaryInfo: [],
  listApiarysWithInfo: []
}

export const INITIAL_STATE = {
  settings: InitialStateSettings,
  user: InitialStateUser,
  apiaries: InitialStateApiaries,
  fieldBook: InitialStateFiedBook,
  hivesplits: InitialStateHiveSplitList,
  declarations: InitialStateDeclarations,
};
