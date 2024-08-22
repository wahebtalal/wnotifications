<?php

namespace Wahebtalal\WNotifications;

use Filament\Notifications\Notification as BaseNotification;

class WNotifications extends BaseNotification
{
    //    protected string $view = 'notifications::notifications.notification';
    protected string $view = 'wnotifications::notification';
}
