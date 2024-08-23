<?php

namespace Wahebtalal\WNotifications\Concerns;

use Closure;

trait HasProgress
{
    protected bool | string | Closure $isProgress = false;

    public function getisProgress(): bool | string | Closure
    {
        return $this->isProgress;
    }

    public function isProgress(bool | string | Closure | null $isProgress = true): static
    {
        $this->isProgress = $isProgress ?? false;

        return $this;
    }
}
