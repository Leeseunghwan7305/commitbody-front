import WeightReps from './WeightReps';
import Reps from './Reps';
import Time from './Time';
import { ExerciseSet } from '../types';

interface ExerciseDetail {
  recordDetailId: number;
  exerciseId: number;
  gifUrl: string;
  detailsReps: number;
  detailsSets: number;
  detailsVolume: number;
  exerciseName: string;
  exerciseType: string;
  max1RM: number;
  sets: ExerciseSet[];
}

interface CompleteExerciseListProps {
  details: ExerciseDetail[];
}

const CompleteExerciseList = ({ details }: CompleteExerciseListProps) => {
  return (
    <div className="flex flex-col overflow-y-scroll pt-[162px]">
      {details.map((detail) => {
        const { exerciseType, exerciseName, detailsSets, detailsReps, max1RM, sets } = detail;

        let detailsText = `${detailsSets}세트`;
        if (exerciseType === 'WEIGHT_AND_REPS') {
          detailsText += ` • ${detailsReps}회 • ${detail.detailsVolume}kg`;
        }

        switch (exerciseType) {
          case 'WEIGHT_AND_REPS':
            return (
              <WeightReps
                key={detail.recordDetailId}
                exerciseName={exerciseName}
                details={detailsText}
                max1RM={max1RM}
                gifUrl={detail.gifUrl}
                sets={sets}
              />
            );
          case 'REPS_ONLY':
            return (
              <Reps
                key={detail.recordDetailId}
                exerciseName={exerciseName}
                details={detailsText}
                sets={sets}
              />
            );
          case 'TIME_ONLY':
            return (
              <Time
                key={detail.recordDetailId}
                exerciseName={exerciseName}
                details={detailsText}
                sets={sets}
              />
            );
          default:
            return <div>{exerciseType}</div>;
        }
      })}
    </div>
  );
};

export default CompleteExerciseList;
