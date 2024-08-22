<?php

namespace Wahebtalal\WNotifications\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Wahebtalal\WNotifications\WNotifications
 */
class WNotifications extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Wahebtalal\WNotifications\WNotifications::class;
    }
}
