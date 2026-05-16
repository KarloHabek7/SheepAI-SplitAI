import { useState, useMemo, useCallback } from 'react';
import { MapFilters } from '@/types';

export function useMapFilters() {
  const [filters, setFiltersState] = useState<MapFilters>({});

  const setFilters = useCallback((newFilters: Partial<MapFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState({});
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status?.length) count++;
    if (filters.category?.length) count++;
    if (filters.severityMin) count++;
    if (filters.dateRange) count++;
    return count;
  }, [filters]);

  return { filters, setFilters, resetFilters, activeFilterCount };
}
