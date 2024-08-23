<?php

namespace Wahebtalal\WNotifications\Livewire;

use Filament\Facades\Filament;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Wahebtalal\WNotifications\Livewire\Notifications as BaseComponent;

class WNotifications extends BaseComponent
{
    public function getUser(): Model | Authenticatable | null
    {
        return Filament::auth()->user();
    }
}
