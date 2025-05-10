export enum productionGoal {
  BEEKEEPING_PRODUCTS,
  REPRODUCTION_AND_MULTIPLICATION,
  POLLINATION,
  DIDACTIC,
  SCIENTIFIC,
  OTHER
}

export enum productType {
  SWARMS,
  HONEY,
  WAX,
  POLLEN,
  PROPOLIS,
  ROYAL_JELLY
};

export enum origin {
  EXTERNAL,
  EXPLORATION
};

export enum quantityType {
  NR,
  KG,
};

export enum reproductionManagement {
  COLONIES_INTRODUCTION, //IC: Introdução de colónias
  COLONIES_MOVEMENT_FROM_FARM, //MC: Movimentação de colónias da exploração
  UNION_OF_COLONIES, //UC: União de colónias
}

export enum reproductionQueen {
  PRODUCED_IN_APIARY_QUEEN, //SR: Substituição por rainha produzida no apiário
  EXTERNAL_QUEEN, //AR: Aquisição de rainhas no exterior
}

export enum reproductionType {
  INTRODUCTION_NAKED_SWARM, //IN: Introdução de enxame nu
  DEVELOPMENTS, //DE: Desdobramentos
  ACQUISITION_SWARMS_COLONIES //AE: Aquisição de enxames/colónias/núcleos
}

export enum productionType {
  BIOLOGIC,
  CONVERSION,
  CONVENTIONAL
}

export enum taskType {
  HARVEST,
  OPEN_TRANSPORT,
  CLOSED_TRANSPORT,
  PROCESSING,
}
