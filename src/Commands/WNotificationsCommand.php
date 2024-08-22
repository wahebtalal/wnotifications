<?php

namespace Wahebtalal\WNotifications\Commands;

use Illuminate\Console\Command;

class WNotificationsCommand extends Command
{
    public $signature = 'wnotifications';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
