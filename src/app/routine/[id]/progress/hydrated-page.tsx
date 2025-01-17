import { auth } from '@/auth';
import ProgressRoutineList from '@/app/routine/[id]/progress/components/ProgressRoutineList';
import { getRoutineDetail } from '@/app/api/routine';
import Header from '@/components/layouts/Header';
import Back from '@/components/common/Back';
interface RoutineProgressProps {
  routineId: string;
}

const RoutineProgress = async ({ routineId }: RoutineProgressProps) => {
  const session = await auth();
  // console.log(routineId);
  // const routineId = params.id;
  // console.log('Routine ID:', routineId);

  const response = await getRoutineDetail(routineId, session);
  const routineDetails = response.data.routineDtos[0];

  // console.log(routineDetails.exercises);
  return (
    <div>
      <Header
        className={'bg-backgrounds-default'}
        left={
          <div>
            <Back />
          </div>
        }
        right={<h1>완료</h1>}
      />
      <ProgressRoutineList routineDetails={routineDetails} />
    </div>
  );
};

export default RoutineProgress;
