import React, { RefObject } from 'react';
import Image from 'next/image';
import { useLikeRegister } from '@/app/api/exercise/query';
import { useSession } from 'next-auth/react';

interface ExerciseListDataProps {
  handleListClick: (id: number) => void;
  scrollRef: RefObject<HTMLDivElement>;
  observerRef: RefObject<HTMLDivElement>;
  searchResults: any;
  filters: any;
}

const ExerciseListData = ({
  searchResults,
  handleListClick,
  scrollRef,
  observerRef,
  filters,
}: ExerciseListDataProps) => {
  const { data: session } = useSession();
  const mutation = useLikeRegister(filters);
  return (
    <div
      ref={scrollRef}
      className="w-full overflow-y-scroll mt-5"
      style={{ height: 'calc(100vh - 148px - 20px)' }}
    >
      {searchResults.map((list: any) => (
        <div
          key={list.exerciseId}
          className="flex items-center w-full h-[76px] border-b border-backgrounds-light cursor-pointer pr-6"
          onClick={() => handleListClick(list.id)}
        >
          {/* <Image src={list.gifUrl} alt={'운동 이미지'} width={76} height={76} /> */}
          <span className="flex-1 ml-4">{list.exerciseName}</span>
          <Image
            onClick={(e) => {
              e.stopPropagation();
              mutation.mutate({
                exerciseId: list.exerciseId,
                source: list.source,
                session: session,
              });
            }}
            width={24}
            height={24}
            src={list.interest ? '/assets/heart_on.svg' : '/assets/heart_off.svg'}
            alt={list.like ? '좋아요' : '좋아요 안 함'}
          />
        </div>
      ))}
      <div ref={observerRef} className="h-10 w-40" />
    </div>
  );
};

export default ExerciseListData;
