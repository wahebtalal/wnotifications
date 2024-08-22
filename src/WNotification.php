<?php

namespace Wahebtalal\WNotifications;

use Filament\Notifications\Notification as BaseNotification;

class WNotification extends BaseNotification
{
    protected string $view = 'wnotifications::notification';

    protected string $viewIdentifier = 'wnotification';
}
