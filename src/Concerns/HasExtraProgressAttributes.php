<?php

namespace Wahebtalal\WNotifications\Concerns;

use Closure;
use Illuminate\View\ComponentAttributeBag;

trait HasExtraProgressAttributes
{
    protected array $extraProgressAttributes = [];

    /**
     * @param  array<mixed> | Closure  $attributes
     */
    public function extraProgressAttributes(array | Closure | null $attributes, bool $merge = false): static
    {
        if ($attributes === null) {
            return $this;
        }
        if ($merge) {
            $this->extraProgressAttributes[] = $attributes;
        } else {
            $this->extraProgressAttributes = [$attributes];
        }

        return $this;
    }

    /**
     * @return array<mixed>
     */
    public function getExtraProgressAttributes(): array
    {
        $temporaryAttributeBag = new ComponentAttributeBag;

        foreach ($this->extraProgressAttributes as $extraProgressAttributes) {
            $temporaryAttributeBag = $temporaryAttributeBag->merge($this->evaluate($extraProgressAttributes));
        }

        return $temporaryAttributeBag->getAttributes();
    }

    public function getExtraProgressAttributeBag(): ComponentAttributeBag
    {
        return new ComponentAttributeBag($this->getExtraProgressAttributes());
    }
}
