import React from 'react';
import { useDeleteSearchRecordMutation, useGetSearchRecord } from '@/app/api/search/query';
import { useSession } from 'next-auth/react';

const useRecentSearch = () => {
  const { data: session } = useSession();
  const { data } = useGetSearchRecord({ session });

  const deleteSearchMutation = useDeleteSearchRecordMutation();

  const handleDeleteAllSearchRecords = () => {
    deleteSearchMutation.mutate({ type: 'all', session });
  };

  return {
    data,
    deleteSearchMutation,
    handleDeleteAllSearchRecords,
    session,
  };
};

export default useRecentSearch;
