<?php

namespace Wahebtalal\WNotifications\Commands;

use Illuminate\Console\Command;

class WNotificationsCommand extends Command
{
    public $signature = 'WN:Install';

    public $description = 'Prepare for WNotification';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
