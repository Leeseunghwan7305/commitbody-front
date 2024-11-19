'use client';
import React, { useState } from 'react';
import ExerciseInfo from '../components/ExerciseInfo';
import SelectToggle from '../components/SelectToggle';
import Comment from '../components/Comment';
import Record from '../components/Record';
import { useSearchParams } from 'next/navigation';
import { useDetailsInfo } from '@/app/api/exercise-details/query';
import { useSession } from 'next-auth/react';

interface ExerciseDetails {
  id: string;
}

const ExerciseDetails = ({ id }: ExerciseDetails) => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [selected, setSelected] = useState<'explain' | 'record'>(
    type === 'default' ? 'explain' : 'record'
  );
  const { data: session } = useSession();

  //TODO : 상세 데이터가져오는 API 추후에 루틴쪽 완성되면 연동 예정
  const { data } = useDetailsInfo({ id, source: 'default', session });
  console.log(data);
  return (
    <div>
      <ExerciseInfo id={id} type={type} info={data?.data} />
      <SelectToggle type={type} selected={selected} setSelected={setSelected} />
      {type === 'default' && selected === 'explain' && (
        <div className="w-full px-5 mt-4 mb-10">
          <h4 className="text-lg text-text-main font-bold mb-2">운동 순서</h4>
          {data?.data?.exerciseMethods.map((order, index) => {
            return (
              <p key={index} className="mb-2">
                {index + 1}. {order}
              </p>
            );
          })}

          <div className="w-[320px] h-[40px] rounded-6 border border-backgrounds-light text-s flex justify-between items-center px-4 mb-10 mt-5">
            <div className="leading-[18px] text-text-main ">더 자세한 동작을 알고싶다면?</div>
            <div className="leading-[18px] text-blue">동영상 보러 가기 </div>
          </div>
          <Comment />
        </div>
      )}
      {selected === 'record' && <Record info={data?.data} />}
    </div>
  );
};

export default ExerciseDetails;
