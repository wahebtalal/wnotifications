<?php

namespace Wahebtalal\WNotifications\Concerns;

use Closure;

trait HasProgressColor
{
    protected int | string | Closure | null $progressColor = 16;

    public function progressColor(string | Closure | null $progressColor): static
    {
        $this->progressColor = $progressColor;

        return $this;
    }

    public function getProgressColor(): int | string | null
    {
        return $this->progressColor;
    }
}
