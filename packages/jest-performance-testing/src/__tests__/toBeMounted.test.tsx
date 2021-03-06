import React from 'react';
import { render } from '@testing-library/react';
import { perf, wait } from '../../../react-performance-testing/src/index';
import '../index';

test('should true when component is mounted', async () => {
  const Component = () => <div />;

  const { renderCount } = perf<{ Component: unknown }>(React);

  render(<Component />);

  await wait(() => expect(renderCount.current.Component).toBeMounted());
});

test('should throw error when component is not mounted', async () => {
  const { renderCount } = perf<{ Component: unknown }>(React);

  await wait(() =>
    expect(() => expect(renderCount.current.Component).toBeMounted()).toThrow(
      /Specified component could not be found/,
    ),
  );
});

test('should true even if component is not mounted when using `not` declaration', async () => {
  const { renderCount } = perf<{ Component: unknown }>(React);

  await wait(() => expect(renderCount.current.Component).not.toBeMounted());
});

test('should throw error even if component is mounted when using `not` declaration', async () => {
  const Component = () => <div />;

  const { renderCount } = perf<{ Component: unknown }>(React);

  render(<Component />);

  await wait(() =>
    expect(() =>
      expect(renderCount.current.Component).not.toBeMounted(),
    ).toThrow(/Specified component could be found/),
  );
});
