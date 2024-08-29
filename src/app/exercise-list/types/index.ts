export interface Filters {
  name: string;
  target: string;
  equipment: string;
  favorite: boolean;
  source: string;
}

export interface Exercise_list {
  exerciseId: number;
  exerciseName: string;
  gifUrl: string;
  exerciseTarget: string;
  exerciseType: string;
  exerciseEquipment: string;
  interest: boolean;
  source: 'default' | 'custom';
}
