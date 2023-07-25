/* eslint-disable @typescript-eslint/require-await */
import { describe, it, vi, expect } from 'vitest';
import { render } from '@testing-library/react';

import Header from '../components/Header';

describe('Renders headr component succesfully', async () => {
    it('Should render the page correctly', async () => {

        const setTimeValue = vi.fn();
        const obsTime = new Date('2023-01-01T00:00:00Z')

        const wrapper = render(<Header obsTime={obsTime} setTimeValue={setTimeValue}/>);
        expect(wrapper).toBeTruthy()
    });
});


