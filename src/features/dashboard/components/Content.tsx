import BillsPeriod from './BillsPeriod';
import BillsTimeline from './BillsTimeline';
import ExportBills from './ExportBills';
import MostUsedConsumers from './MostUsedConsumers';
import MostUsedLocations from './MostUsedLocations';
import MostUsedReceivers from './MostUsedReceivers';
import TotalBills from './TotalBills';
import TotalBillsAmount from './TotalBillsAmount';
import TotalConsumers from './TotalConsumers';
import TotalLocations from './TotalLocations';
import TotalReceivers from './TotalReceivers';
import TotalUsers from './TotalUsers';

import type { ReactElement } from 'react';

function Content(): ReactElement {
    return (
        <div className="flex flex-col gap-4">
            <BillsTimeline />
            <div className="grid gap-4 sm:grid-cols-2">
                <TotalBills />
                <TotalBillsAmount />
            </div>
            <BillsPeriod />
            <MostUsedReceivers />
            <MostUsedLocations />
            <MostUsedConsumers />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <TotalReceivers />
                <TotalLocations />
                <TotalConsumers />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <TotalUsers />
                <ExportBills />
            </div>
        </div>
    );
}

export default Content;
