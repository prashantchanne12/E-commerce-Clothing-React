import { createSelector } from 'reselect';

const selectDirectoty = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectDirectoty],
    directory => directory.sections
);