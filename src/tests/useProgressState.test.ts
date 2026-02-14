import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgressState } from '../pages/MinigamePage/useProgressState';

describe('useProgressState', () => {

  //test 1 : no questions, no statuses
  it('initial state has total 0 and empty statuses', () => {
    const { result } = renderHook(() => useProgressState());
    expect(result.current.progressState.total).toBe(0);
    expect(result.current.progressState.statuses).toEqual([]);
  });

 //test 2: initialization 
  it('init(3) sets total to 3 and statuses to three pendings', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(3);
    });
    expect(result.current.progressState.total).toBe(3);
    expect(result.current.progressState.statuses).toEqual(['pending', 'pending', 'pending']);
  });

  //test 3: mark correct
  it('markCorrect(0) sets first question to correct', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(3);
    });
    act(() => {
      // please notice the index of first question is 0
      result.current.progressApi.markCorrect(0);
    });
    expect(result.current.progressState.statuses[0]).toBe('correct');
    expect(result.current.progressState.statuses[1]).toBe('pending');
    expect(result.current.progressState.statuses[2]).toBe('pending');
  });

  // test 4: mark incorrect
  it('markIncorrect(1) sets second question to incorrect', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(3);
    });
    act(() => {
      result.current.progressApi.markIncorrect(1);
    });
    expect(result.current.progressState.statuses[0]).toBe('pending');
    expect(result.current.progressState.statuses[1]).toBe('incorrect');
    expect(result.current.progressState.statuses[2]).toBe('pending');
  });

  // test 5: co-existance of mark correct/incorrect 
  it('markCorrect and markIncorrect can be used together', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(3);
    });
    act(() => {
      result.current.progressApi.markCorrect(0);
      result.current.progressApi.markIncorrect(1);
    });
    expect(result.current.progressState.statuses[0]).toBe('correct');
    expect(result.current.progressState.statuses[1]).toBe('incorrect');
    expect(result.current.progressState.statuses[2]).toBe('pending');
  });

  // test 6: mark correct with invalid index
  it('markCorrect(-1) does not throw and does not change state', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(2);
    });
    act(() => {
      result.current.progressApi.markCorrect(-1);
    });
    expect(result.current.progressState.statuses).toEqual(['pending', 'pending']);
  });

  // test 7: mark incorrect with invalid index
  it('markIncorrect(-1) does not throw and does not change state', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(2);
    });
    act(() => {
      result.current.progressApi.markIncorrect(-1);
    });
    expect(result.current.progressState.statuses).toEqual(['pending', 'pending']);
  });

  // test 8: reset progress bar
  it('reset() restores initial state', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(3);
      result.current.progressApi.markCorrect(0);
    });
    act(() => {
      result.current.progressApi.reset();
    });
    expect(result.current.progressState.total).toBe(0);
    expect(result.current.progressState.statuses).toEqual([]);
  });

  // test 9: get current progress state
  it('getProgress() returns current progress state', () => {
    const { result } = renderHook(() => useProgressState());
    act(() => {
      result.current.progressApi.init(2);
    });
    const state = result.current.progressApi.getProgress();
    expect(state.total).toBe(2);
    expect(state.statuses).toEqual(['pending', 'pending']);
    act(() => {
      result.current.progressApi.markCorrect(0);
    });
    const stateAfter = result.current.progressApi.getProgress();
    expect(stateAfter.statuses[0]).toBe('correct');
  });
});
