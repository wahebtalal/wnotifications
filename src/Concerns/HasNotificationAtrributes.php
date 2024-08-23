<?php

namespace Wahebtalal\WNotifications\Concerns;

use Closure;

trait HasNotificationAtrributes
{
    protected int | string | Closure $progressColor = 16;

    public function progressColor(string | Closure | null $progressColor): static
    {
        $this->progressColor = $progressColor;

        return $this;
    }

    public function getProgressColor(): int | string
    {
        return $this->progressColor;
    }


}
